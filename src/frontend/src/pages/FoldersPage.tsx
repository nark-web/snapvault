import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { FolderOpen, FolderPlus, Search, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { DashboardHeader, Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { FolderCard } from "../components/ui/FolderCard";
import { useFolders } from "../hooks/useFolders";
import type { Folder } from "../types";

interface FolderFormData {
  name: string;
  priceInDollars: string;
}

export default function FoldersPage() {
  const {
    folders,
    isLoading,
    create,
    isCreating,
    update,
    isUpdating,
    remove,
    regenerateCode,
  } = useFolders();

  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editFolder, setEditFolder] = useState<Folder | null>(null);
  const [form, setForm] = useState<FolderFormData>({
    name: "",
    priceInDollars: "",
  });
  const [formError, setFormError] = useState("");

  const filtered = folders.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()),
  );

  function openCreate() {
    setForm({ name: "", priceInDollars: "" });
    setFormError("");
    setCreateOpen(true);
  }

  function openEdit(folder: Folder) {
    setForm({
      name: folder.name,
      priceInDollars: (Number(folder.priceInCents) / 100).toFixed(2),
    });
    setFormError("");
    setEditFolder(folder);
  }

  async function handleSubmitCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      setFormError("Folder name is required");
      return;
    }
    const price = Number.parseFloat(form.priceInDollars);
    if (Number.isNaN(price) || price < 0) {
      setFormError("Enter a valid price");
      return;
    }
    try {
      await create({
        name: form.name.trim(),
        priceInCents: BigInt(Math.round(price * 100)),
      });
      toast.success("Gallery created!");
      setCreateOpen(false);
    } catch {
      toast.error("Failed to create gallery");
    }
  }

  async function handleSubmitEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editFolder) return;
    if (!form.name.trim()) {
      setFormError("Name is required");
      return;
    }
    const price = Number.parseFloat(form.priceInDollars);
    if (Number.isNaN(price) || price < 0) {
      setFormError("Enter a valid price");
      return;
    }
    try {
      await update({
        id: editFolder.id,
        name: form.name.trim(),
        priceInCents: BigInt(Math.round(price * 100)),
      });
      toast.success("Gallery updated!");
      setEditFolder(null);
    } catch {
      toast.error("Failed to update gallery");
    }
  }

  async function handleDelete(id: string) {
    if (
      !confirm("Delete this gallery and all its files? This cannot be undone.")
    )
      return;
    try {
      await remove(id);
      toast.success("Gallery deleted");
    } catch {
      toast.error("Failed to delete gallery");
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
            title="My Galleries"
            subtitle={`${folders.length} client ${folders.length === 1 ? "gallery" : "galleries"}`}
            actions={
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                onClick={openCreate}
                data-ocid="folders.create_button"
              >
                <FolderPlus className="w-4 h-4" />
                New Gallery
              </Button>
            }
          />

          {/* Search */}
          <div className="relative mb-6 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search galleries…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-muted/40"
              data-ocid="folders.search_input"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Folder Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {(["a", "b", "c", "d", "e", "f"] as const).map((id) => (
                <Skeleton key={id} className="h-72 rounded-sm" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-sm"
              data-ocid="folders.empty_state"
            >
              <FolderOpen className="w-12 h-12 text-muted-foreground/40 mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-2">
                {search ? "No galleries match your search" : "No galleries yet"}
              </h3>
              {!search && (
                <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                  Create your first gallery to start delivering photos to
                  clients.
                </p>
              )}
              {!search && (
                <Button
                  className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                  onClick={openCreate}
                  data-ocid="folders.create_first_button"
                >
                  <FolderPlus className="w-4 h-4" />
                  Create Gallery
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((folder, i) => (
                <motion.div
                  key={folder.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <FolderCard
                    folder={folder}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                    onRegenerateCode={handleRegenerate}
                    index={i + 1}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Layout>

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="dark" data-ocid="folder.create_dialog">
          <DialogHeader>
            <DialogTitle className="font-display">
              Create New Gallery
            </DialogTitle>
            <DialogDescription>
              Set up a new client gallery with price and access code.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitCreate} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="create-name">Gallery Name</Label>
              <Input
                id="create-name"
                placeholder="e.g. Sarah & Tom Wedding 2024"
                value={form.name}
                onChange={(e) => {
                  setForm((f) => ({ ...f, name: e.target.value }));
                  setFormError("");
                }}
                data-ocid="folder.name_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="create-price">Price (USD)</Label>
              <Input
                id="create-price"
                type="number"
                step="0.01"
                min="0"
                placeholder="49.00"
                value={form.priceInDollars}
                onChange={(e) => {
                  setForm((f) => ({ ...f, priceInDollars: e.target.value }));
                  setFormError("");
                }}
                data-ocid="folder.price_input"
              />
            </div>
            {formError && (
              <p
                className="text-xs text-destructive"
                data-ocid="folder.form_error_state"
              >
                {formError}
              </p>
            )}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setCreateOpen(false)}
                data-ocid="folder.create_cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={isCreating}
                data-ocid="folder.create_submit_button"
              >
                {isCreating ? "Creating…" : "Create Gallery"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editFolder}
        onOpenChange={(open) => !open && setEditFolder(null)}
      >
        <DialogContent className="dark" data-ocid="folder.edit_dialog">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Gallery</DialogTitle>
            <DialogDescription>Update gallery name or price.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="edit-name">Gallery Name</Label>
              <Input
                id="edit-name"
                value={form.name}
                onChange={(e) => {
                  setForm((f) => ({ ...f, name: e.target.value }));
                  setFormError("");
                }}
                data-ocid="folder.edit_name_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-price">Price (USD)</Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                min="0"
                value={form.priceInDollars}
                onChange={(e) => {
                  setForm((f) => ({ ...f, priceInDollars: e.target.value }));
                  setFormError("");
                }}
                data-ocid="folder.edit_price_input"
              />
            </div>
            {formError && (
              <p
                className="text-xs text-destructive"
                data-ocid="folder.edit_form_error_state"
              >
                {formError}
              </p>
            )}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setEditFolder(null)}
                data-ocid="folder.edit_cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={isUpdating}
                data-ocid="folder.edit_submit_button"
              >
                {isUpdating ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </ProtectedRoute>
  );
}
