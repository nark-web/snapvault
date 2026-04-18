import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "../../lib/utils";

interface AccessCodeBadgeProps {
  code: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AccessCodeBadge({
  code,
  size = "md",
  className,
}: AccessCodeBadgeProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Access code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "group inline-flex items-center gap-2 font-mono tracking-[0.2em] rounded-sm border border-border bg-muted/60 hover:border-accent/50 hover:bg-muted transition-smooth",
        size === "sm" && "px-2.5 py-1 text-xs",
        size === "md" && "px-3 py-1.5 text-sm",
        size === "lg" && "px-4 py-2.5 text-base",
        className,
      )}
      aria-label="Copy access code"
      data-ocid="access_code.copy_button"
    >
      <span className="text-foreground">{code}</span>
      {copied ? (
        <Check
          className={cn(
            "shrink-0 text-accent",
            size === "sm" ? "w-3 h-3" : "w-4 h-4",
          )}
        />
      ) : (
        <Copy
          className={cn(
            "shrink-0 text-muted-foreground group-hover:text-accent transition-colors",
            size === "sm" ? "w-3 h-3" : "w-4 h-4",
          )}
        />
      )}
    </button>
  );
}
