import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Image, RefreshCw, Trash2, Upload, X } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { DashboardHeader, Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { AccessCodeBadge } from "../components/ui/AccessCodeBadge";
import { FileCard } from "../components/ui/FileCard";
import { useFiles, useUploadFile } from "../hooks/useFiles";
import { useFolder } from "../hooks/useFolders";
import { useFolders } from "../hooks/useFolders";
import { formatPrice } from "../lib/utils";

export default function FolderDetailPage() {
  const { folderId } = useParams({ from: "/folders/$folderId" });
  const navigate = useNavigate();
  const { data: folder, isLoading: folderLoading } = useFolder(folderId);
  const {
    files,
    isLoading: filesLoading,
    remove,
    isDeleting,
  } = useFiles(folderId);
  const { regenerateCode, isRegenerating } = useFolders();
  const uploadFileMutation = useUploadFile(folderId);

  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function uploadFiles(fileList: FileList) {
    const files = Array.from(fileList);
    setUploading(files.map((f) => f.name));
    for (const file of files) {
      try {
        await uploadFileMutation.mutateAsync(file);
        toast.success(`Uploaded ${file.name}`);
      } catch {
        toast.error(`Failed to upload ${file.name}`);
      }
    }
    setUploading([]);
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  };

  async function handleDelete(fileId: string) {
    if (!confirm("Delete this file?")) return;
    try {
      await remove(fileId);
      toast.success("File deleted");
    } catch {
      toast.error("Failed to delete file");
    }
  }

  async function handleRegenerate() {
    try {
      await regenerateCode(folderId);
      toast.success("New access code generated");
    } catch {
      toast.error("Failed to regenerate code");
    }
  }

  if (folderLoading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="dark p-6 sm:p-8 space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  if (!folder) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="dark p-8 text-center">
            <p className="text-muted-foreground">Gallery not found.</p>
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => navigate({ to: "/folders" })}
            >
              Back to Galleries
            </Button>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="dark p-6 sm:p-8 max-w-6xl">
          {/* Back */}
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground mb-6 -ml-2"
            onClick={() => navigate({ to: "/folders" })}
            data-ocid="folder_detail.back_button"
          >
            <ArrowLeft className="w-4 h-4" />
            All Galleries
          </Button>

          <DashboardHeader
            title={folder.name}
            subtitle={`${folder.fileCount.toString()} files · ${formatPrice(folder.priceInCents)}`}
            actions={
              <div className="flex items-center gap-2">
                <AccessCodeBadge code={folder.accessCode} size="sm" />
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 border-border/60"
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                  data-ocid="folder_detail.regenerate_code_button"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${isRegenerating ? "animate-spin" : ""}`}
                  />
                  New Code
                </Button>
              </div>
            }
          />

          {/* Upload Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-sm p-8 mb-8 text-center transition-smooth cursor-pointer ${
              dragOver
                ? "border-accent bg-accent/5"
                : "border-border hover:border-accent/40 hover:bg-muted/20"
            }`}
            data-ocid="folder_detail.dropzone"
          >
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Upload files"
            />
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              className="sr-only"
              onChange={(e) => e.target.files && uploadFiles(e.target.files)}
            />
            <Upload className="w-8 h-8 text-muted-foreground/60 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Images and videos
            </p>

            {uploading.length > 0 && (
              <div className="mt-4 space-y-1">
                {uploading.map((name) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <Upload className="w-3 h-3 animate-pulse text-accent" />
                    Uploading {name}…
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Files Grid */}
          {filesLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {(["a", "b", "c", "d", "e", "f", "g", "h"] as const).map((id) => (
                <Skeleton key={id} className="aspect-square rounded-sm" />
              ))}
            </div>
          ) : files.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-sm"
              data-ocid="folder_detail.empty_state"
            >
              <Image className="w-10 h-10 text-muted-foreground/40 mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-1">
                No files yet
              </h3>
              <p className="text-sm text-muted-foreground">
                Upload photos and videos to this gallery
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {files.map((file, i) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <FileCard
                    file={file}
                    onDelete={handleDelete}
                    isDeleting={isDeleting}
                    index={i + 1}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
