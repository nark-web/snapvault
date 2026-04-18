import { r as reactExports, j as jsxRuntimeExports, c as cn, a as ue, b as useQueryClient, d as useParams, u as useNavigate, S as Skeleton, f as formatPrice } from "./index-CMPuHGe2.js";
import { c as createLucideIcon, a as useActor, b as useQuery, d as useMutation, e as apiFileDelete, f as apiFileUpload, E as ExternalBlob, g as createActor, h as apiFileList, L as Layout, B as Button, D as DashboardHeader, m as motion } from "./Layout-BpCmKaPP.js";
import { P as ProtectedRoute } from "./ProtectedRoute-LpjurouH.js";
import { C as Copy, a as useFolder, u as useFolders, R as RefreshCw } from "./useFolders-p6R8klPp.js";
import { I as Image, F as FileCard } from "./FileCard-B_9rsziq.js";
import "./badge-D4eV2U_G.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function AccessCodeBadge({
  code,
  size = "md",
  className
}) {
  const [copied, setCopied] = reactExports.useState(false);
  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    ue.success("Access code copied to clipboard");
    setTimeout(() => setCopied(false), 2e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: handleCopy,
      className: cn(
        "group inline-flex items-center gap-2 font-mono tracking-[0.2em] rounded-sm border border-border bg-muted/60 hover:border-accent/50 hover:bg-muted transition-smooth",
        size === "sm" && "px-2.5 py-1 text-xs",
        size === "md" && "px-3 py-1.5 text-sm",
        size === "lg" && "px-4 py-2.5 text-base",
        className
      ),
      "aria-label": "Copy access code",
      "data-ocid": "access_code.copy_button",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: code }),
        copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Check,
          {
            className: cn(
              "shrink-0 text-accent",
              size === "sm" ? "w-3 h-3" : "w-4 h-4"
            )
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Copy,
          {
            className: cn(
              "shrink-0 text-muted-foreground group-hover:text-accent transition-colors",
              size === "sm" ? "w-3 h-3" : "w-4 h-4"
            )
          }
        )
      ]
    }
  );
}
function useFiles(folderId) {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["files", folderId],
    queryFn: () => apiFileList(actor, folderId),
    enabled: !!actor && !isFetching && !!folderId
  });
  const uploadMutation = useMutation({
    mutationFn: (input) => apiFileUpload(actor, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files", folderId] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    }
  });
  const deleteMutation = useMutation({
    mutationFn: (fileId) => apiFileDelete(actor, fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files", folderId] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    }
  });
  return {
    files: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    upload: uploadMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
    remove: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending
  };
}
function useUploadFile(folderId) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file) => {
      if (!actor) throw new Error("Not authenticated");
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes);
      const input = {
        blob,
        name: file.name,
        size: BigInt(file.size),
        mimeType: file.type || "application/octet-stream",
        folderId
      };
      return apiFileUpload(actor, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files", folderId] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    }
  });
}
function FolderDetailPage() {
  const { folderId } = useParams({ from: "/folders/$folderId" });
  const navigate = useNavigate();
  const { data: folder, isLoading: folderLoading } = useFolder(folderId);
  const {
    files,
    isLoading: filesLoading,
    remove,
    isDeleting
  } = useFiles(folderId);
  const { regenerateCode, isRegenerating } = useFolders();
  const uploadFileMutation = useUploadFile(folderId);
  const [dragOver, setDragOver] = reactExports.useState(false);
  const [uploading, setUploading] = reactExports.useState([]);
  const fileInputRef = reactExports.useRef(null);
  async function uploadFiles(fileList) {
    const files2 = Array.from(fileList);
    setUploading(files2.map((f) => f.name));
    for (const file of files2) {
      try {
        await uploadFileMutation.mutateAsync(file);
        ue.success(`Uploaded ${file.name}`);
      } catch {
        ue.error(`Failed to upload ${file.name}`);
      }
    }
    setUploading([]);
  }
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  };
  async function handleDelete(fileId) {
    if (!confirm("Delete this file?")) return;
    try {
      await remove(fileId);
      ue.success("File deleted");
    } catch {
      ue.error("Failed to delete file");
    }
  }
  async function handleRegenerate() {
    try {
      await regenerateCode(folderId);
      ue.success("New access code generated");
    } catch {
      ue.error("Failed to regenerate code");
    }
  }
  if (folderLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dark p-6 sm:p-8 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" })
    ] }) }) });
  }
  if (!folder) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dark p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Gallery not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          className: "mt-4",
          onClick: () => navigate({ to: "/folders" }),
          children: "Back to Galleries"
        }
      )
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dark p-6 sm:p-8 max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        size: "sm",
        className: "gap-1.5 text-muted-foreground hover:text-foreground mb-6 -ml-2",
        onClick: () => navigate({ to: "/folders" }),
        "data-ocid": "folder_detail.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "All Galleries"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DashboardHeader,
      {
        title: folder.name,
        subtitle: `${folder.fileCount.toString()} files · ${formatPrice(folder.priceInCents)}`,
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccessCodeBadge, { code: folder.accessCode, size: "sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "gap-1.5 border-border/60",
              onClick: handleRegenerate,
              disabled: isRegenerating,
              "data-ocid": "folder_detail.regenerate_code_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RefreshCw,
                  {
                    className: `w-3.5 h-3.5 ${isRegenerating ? "animate-spin" : ""}`
                  }
                ),
                "New Code"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onDragOver: (e) => {
          e.preventDefault();
          setDragOver(true);
        },
        onDragLeave: () => setDragOver(false),
        onDrop: handleDrop,
        className: `relative border-2 border-dashed rounded-sm p-8 mb-8 text-center transition-smooth cursor-pointer ${dragOver ? "border-accent bg-accent/5" : "border-border hover:border-accent/40 hover:bg-muted/20"}`,
        "data-ocid": "folder_detail.dropzone",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                var _a;
                return (_a = fileInputRef.current) == null ? void 0 : _a.click();
              },
              className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
              "aria-label": "Upload files"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              multiple: true,
              accept: "image/*,video/*",
              className: "sr-only",
              onChange: (e) => e.target.files && uploadFiles(e.target.files)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-8 h-8 text-muted-foreground/60 mx-auto mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Click to upload" }),
            " ",
            "or drag and drop"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Images and videos" }),
          uploading.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-1", children: uploading.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 text-xs text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3 h-3 animate-pulse text-accent" }),
                "Uploading ",
                name,
                "…"
              ]
            },
            name
          )) })
        ]
      }
    ),
    filesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3", children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-sm" }, id)) }) : files.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-sm",
        "data-ocid": "folder_detail.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-10 h-10 text-muted-foreground/40 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-1", children: "No files yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Upload photos and videos to this gallery" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3", children: files.map((file, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { delay: i * 0.03 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FileCard,
          {
            file,
            onDelete: handleDelete,
            isDeleting,
            index: i + 1
          }
        )
      },
      file.id
    )) })
  ] }) }) });
}
export {
  FolderDetailPage as default
};
