import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import { ExternalBlob } from "../backend";
import { apiFileDelete, apiFileList, apiFileUpload } from "../lib/api";
import type { FileId, FolderId, UploadFileInput } from "../types";

export function useFiles(folderId: FolderId) {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["files", folderId],
    queryFn: () => apiFileList(actor, folderId),
    enabled: !!actor && !isFetching && !!folderId,
  });

  const uploadMutation = useMutation({
    mutationFn: (input: UploadFileInput) => apiFileUpload(actor, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files", folderId] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (fileId: FileId) => apiFileDelete(actor, fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files", folderId] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  return {
    files: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    upload: uploadMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
    remove: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}

export function useUploadFile(folderId: FolderId) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: globalThis.File) => {
      if (!actor) throw new Error("Not authenticated");
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes);
      const input: UploadFileInput = {
        blob,
        name: file.name,
        size: BigInt(file.size),
        mimeType: file.type || "application/octet-stream",
        folderId,
      };
      return apiFileUpload(actor, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files", folderId] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
}
