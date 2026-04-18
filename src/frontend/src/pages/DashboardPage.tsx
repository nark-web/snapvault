import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { FolderOpen, FolderPlus, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { DashboardHeader, Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { FolderCard } from "../components/ui/FolderCard";
import { useFolders } from "../hooks/useFolders";
import type { Folder } from "../types";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { folders, isLoading, remove, regenerateCode } = useFolders();

  const totalFiles = folders.reduce((sum, f) => sum + Number(f.fileCount), 0);

  async function handleDelete(id: string) {
    if (
      !confirm("Delete this folder and all its files? This cannot be undone.")
    )
      return;
    try {
      await remove(id);
      toast.success("Folder deleted");
    } catch {
      toast.error("Failed to delete folder");
    }
  }

  async function handleRegenerate(id: string) {
    try {
      await regenerateCode(id);
      toast.success("New access code generated");
    } catch {
      toast.error("Failed to regenerate code");
    }
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="dark p-6 sm:p-8 max-w-6xl">
          <DashboardHeader
            title="Dashboard"
            subtitle="Manage your client galleries and deliveries"
            actions={
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                onClick={() => navigate({ to: "/folders" })}
                data-ocid="dashboard.create_folder_button"
              >
                <FolderPlus className="w-4 h-4" />
                New Folder
              </Button>
            }
          />

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total Galleries", value: folders.length.toString() },
              { label: "Total Files", value: totalFiles.toString() },
              { label: "Active Deliveries", value: folders.length.toString() },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-sm px-4 py-4"
              >
                <p className="text-xs text-muted-foreground mb-1">
                  {stat.label}
                </p>
                <p className="font-display text-2xl font-semibold text-foreground">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Recent Folders */}
          <div>
            <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              Recent Galleries
            </h2>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {(["a", "b", "c", "d"] as const).map((id) => (
                  <Skeleton key={id} className="h-72 rounded-sm" />
                ))}
              </div>
            ) : folders.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-sm"
                data-ocid="dashboard.empty_state"
              >
                <FolderOpen className="w-12 h-12 text-muted-foreground/40 mb-4" />
                <h3 className="font-display font-semibold text-foreground mb-2">
                  No galleries yet
                </h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                  Create your first client gallery to start sharing and getting
                  paid for your work.
                </p>
                <Button
                  className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                  onClick={() => navigate({ to: "/folders" })}
                  data-ocid="dashboard.create_first_folder_button"
                >
                  <FolderPlus className="w-4 h-4" />
                  Create Gallery
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {folders.slice(0, 8).map((folder: Folder, i) => (
                  <motion.div
                    key={folder.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <FolderCard
                      folder={folder}
                      onEdit={() => navigate({ to: `/folders/${folder.id}` })}
                      onDelete={handleDelete}
                      onRegenerateCode={handleRegenerate}
                      index={i + 1}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
