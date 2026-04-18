import { c as createLucideIcon, a as useActor, b as useQuery, d as useMutation, i as apiFolderRegenerateCode, j as apiFolderDelete, k as apiFolderUpdate, l as apiFolderCreate, g as createActor, n as apiFolderList, o as apiFolderGet } from "./Layout-BpCmKaPP.js";
import { b as useQueryClient } from "./index-CMPuHGe2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
function useFolders() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["folders"],
    queryFn: () => apiFolderList(actor),
    enabled: !!actor && !isFetching
  });
  const createMutation = useMutation({
    mutationFn: (input) => apiFolderCreate(actor, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    }
  });
  const updateMutation = useMutation({
    mutationFn: (input) => apiFolderUpdate(actor, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    }
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => apiFolderDelete(actor, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    }
  });
  const regenerateCodeMutation = useMutation({
    mutationFn: (id) => apiFolderRegenerateCode(actor, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    }
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
    isRegenerating: regenerateCodeMutation.isPending
  };
}
function useFolder(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["folder", id],
    queryFn: () => apiFolderGet(actor, id),
    enabled: !!actor && !isFetching && !!id
  });
}
export {
  Copy as C,
  RefreshCw as R,
  useFolder as a,
  useFolders as u
};
