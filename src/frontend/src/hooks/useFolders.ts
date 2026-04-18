import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import {
  apiFolderCreate,
  apiFolderDelete,
  apiFolderGet,
  apiFolderList,
  apiFolderRegenerateCode,
  apiFolderUpdate,
} from "../lib/api";
import type { CreateFolderInput, FolderId, UpdateFolderInput } from "../types";

export function useFolders() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["folders"],
    queryFn: () => apiFolderList(actor),
    enabled: !!actor && !isFetching,
  });

  const createMutation = useMutation({
    mutationFn: (input: CreateFolderInput) => apiFolderCreate(actor, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (input: UpdateFolderInput) => apiFolderUpdate(actor, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: FolderId) => apiFolderDelete(actor, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const regenerateCodeMutation = useMutation({
    mutationFn: (id: FolderId) => apiFolderRegenerateCode(actor, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  return {
    folders: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    create: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    update: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    remove: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    regenerateCode: regenerateCodeMutation.mutateAsync,
    isRegenerating: regenerateCodeMutation.isPending,
  };
}

export function useFolder(id: FolderId) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["folder", id],
    queryFn: () => apiFolderGet(actor, id),
    enabled: !!actor && !isFetching && !!id,
  });
}
