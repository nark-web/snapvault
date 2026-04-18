import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Image, Trash2, Video } from "lucide-react";
import { cn, formatFileSize, isImageType, isVideoType } from "../../lib/utils";
import type { File } from "../../types";

interface FileCardProps {
  file: File;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
  downloadToken?: string;
  index: number;
}

export function FileCard({
  file,
  onDelete,
  isDeleting,
  downloadToken,
  index,
}: FileCardProps) {
  const isImage = isImageType(file.mimeType);
  const isVideo = isVideoType(file.mimeType);
  const url = file.blob.getDirectURL();

  return (
    <div
      className="group relative bg-card border border-border rounded-sm overflow-hidden hover:border-accent/40 transition-smooth hover:shadow-elevated"
      data-ocid={`file.item.${index}`}
    >
      {/* Preview */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        {isImage ? (
          <img
            src={url}
            alt={file.name}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
            loading="lazy"
          />
        ) : isVideo ? (
          <video
            src={url}
            className="w-full h-full object-cover"
            preload="metadata"
          >
            <track kind="captions" />
          </video>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Image className="w-8 h-8 text-muted-foreground" />
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center gap-2">
          {downloadToken && (
            <a
              href={url}
              download={file.name}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent text-accent-foreground text-xs font-medium rounded-sm hover:bg-accent/90 transition-colors"
              data-ocid={`file.download_button.${index}`}
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </a>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => onDelete(file.id)}
              disabled={isDeleting}
              data-ocid={`file.delete_button.${index}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>

        {/* Type badge */}
        <div className="absolute top-2 left-2">
          {isVideo && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0.5 gap-1">
              <Video className="w-3 h-3" />
              Video
            </Badge>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="px-3 py-2.5">
        <p
          className="text-sm font-medium text-foreground truncate"
          title={file.name}
        >
          {file.name}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatFileSize(file.size)}
        </p>
      </div>
    </div>
  );
}
