import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Download, Image, Package } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { Layout } from "../components/Layout";
import { FileCard } from "../components/ui/FileCard";
import { apiFileList, apiValidateDownloadToken } from "../lib/api";
import type { File, FolderId } from "../types";

export default function ClientDownloadPage() {
  const { folderId } = useParams({ from: "/download/$folderId" });
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);

  const token = new URLSearchParams(window.location.search).get("token") ?? "";

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    if (!actor || isFetching) return;
    if (!token) {
      setUnauthorized(true);
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const valid = await apiValidateDownloadToken(
          actor,
          token,
          folderId as FolderId,
        );
        if (!valid) {
          setUnauthorized(true);
          setLoading(false);
          return;
        }
        const fileList = await apiFileList(actor, folderId as FolderId);
        setFiles(fileList);
      } catch {
        toast.error("Failed to load gallery");
      } finally {
        setLoading(false);
      }
    })();
  }, [actor, isFetching, token, folderId]);

  async function handleDownloadAll() {
    for (const file of files) {
      const url = file.blob.getDirectURL();
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      await new Promise((r) => setTimeout(r, 200));
    }
    toast.success(`Downloading ${files.length} files`);
  }

  return (
    <Layout showSidebar={false}>
      <div className="dark min-h-screen p-6">
        {loading ? (
          <div
            className="max-w-6xl mx-auto space-y-4"
            data-ocid="download.loading_state"
          >
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {(["a", "b", "c", "d", "e", "f"] as const).map((id) => (
                <Skeleton key={id} className="aspect-square rounded-sm" />
              ))}
            </div>
          </div>
        ) : unauthorized ? (
          <div
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            data-ocid="download.error_state"
          >
            <Image className="w-12 h-12 text-muted-foreground/40 mb-4" />
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              Access Required
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              This gallery requires a valid payment. Please use your access code
              to proceed.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/" })}
              data-ocid="download.back_home_button"
            >
              Return Home
            </Button>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
            >
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
                  Your Gallery
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {files.length} {files.length === 1 ? "photo" : "photos"} ready
                  to download
                </p>
              </div>
              {files.length > 0 && (
                <Button
                  className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                  onClick={handleDownloadAll}
                  data-ocid="download.download_all_button"
                >
                  <Package className="w-4 h-4" />
                  Download All ({files.length})
                </Button>
              )}
            </motion.div>

            {files.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-sm"
                data-ocid="download.empty_state"
              >
                <Image className="w-10 h-10 text-muted-foreground/40 mb-3" />
                <p className="text-muted-foreground text-sm">
                  No files in this gallery yet
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
                    <FileCard file={file} downloadToken={token} index={i + 1} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
