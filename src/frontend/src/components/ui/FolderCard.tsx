import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Camera,
  Copy,
  Edit2,
  FolderOpen,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn, formatPrice } from "../../lib/utils";
import type { Folder } from "../../types";

interface FolderCardProps {
  folder: Folder;
  onEdit?: (folder: Folder) => void;
  onDelete?: (id: string) => void;
  onRegenerateCode?: (id: string) => void;
  index: number;
}

export function FolderCard({
  folder,
  onEdit,
  onDelete,
  onRegenerateCode,
  index,
}: FolderCardProps) {
  const [copying, setCopying] = useState(false);

  async function copyCode() {
    setCopying(true);
    await navigator.clipboard.writeText(folder.accessCode);
    toast.success("Access code copied!");
    setTimeout(() => setCopying(false), 1500);
  }

  return (
    <div
      className="group bg-card border border-border rounded-sm overflow-hidden hover:border-accent/30 transition-smooth hover:shadow-elevated"
      data-ocid={`folder.item.${index}`}
    >
      {/* Cover placeholder */}
      <Link
        to="/folders/$folderId"
        params={{ folderId: folder.id }}
        data-ocid={`folder.link.${index}`}
      >
        <div className="relative h-40 bg-muted overflow-hidden flex items-center justify-center cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-background/80" />
          <Camera className="w-10 h-10 text-muted-foreground/40 relative z-10" />
          <div className="absolute bottom-3 right-3 z-10">
            <Badge variant="secondary" className="text-xs gap-1">
              <FolderOpen className="w-3 h-3" />
              {folder.fileCount.toString()} files
            </Badge>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="px-4 py-3 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Link
            to="/folders/$folderId"
            params={{ folderId: folder.id }}
            className="min-w-0"
          >
            <h3 className="font-display font-semibold text-foreground truncate hover:text-accent transition-colors">
              {folder.name}
            </h3>
          </Link>
          <span className="text-accent font-mono text-sm font-medium shrink-0">
            {formatPrice(folder.priceInCents)}
          </span>
        </div>

        {/* Access code */}
        <div className="flex items-center gap-2">
          <code className="flex-1 font-mono text-xs bg-muted px-2.5 py-1.5 rounded-sm text-muted-foreground tracking-widest truncate">
            {folder.accessCode}
          </code>
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-7 w-7 p-0 shrink-0", copying && "text-accent")}
            onClick={copyCode}
            aria-label="Copy access code"
            data-ocid={`folder.copy_code_button.${index}`}
          >
            <Copy className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 pt-1 border-t border-border">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
              onClick={() => onEdit(folder)}
              data-ocid={`folder.edit_button.${index}`}
            >
              <Edit2 className="w-3 h-3" />
              Edit
            </Button>
          )}
          {onRegenerateCode && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
              onClick={() => onRegenerateCode(folder.id)}
              data-ocid={`folder.regenerate_code_button.${index}`}
            >
              <RefreshCw className="w-3 h-3" />
              New Code
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-destructive ml-auto"
              onClick={() => onDelete(folder.id)}
              aria-label="Delete folder"
              data-ocid={`folder.delete_button.${index}`}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
