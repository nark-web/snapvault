import { c as createLucideIcon, C as Camera, F as FolderOpen, B as Button } from "./Layout-BpCmKaPP.js";
import { r as reactExports, j as jsxRuntimeExports, L as Link, f as formatPrice, c as cn, a as ue } from "./index-CMPuHGe2.js";
import { B as Badge, T as Trash2 } from "./badge-D4eV2U_G.js";
import { C as Copy, R as RefreshCw } from "./useFolders-p6R8klPp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "M9 13h6", key: "1uhe8q" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
];
const FolderPlus = createLucideIcon("folder-plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
function FolderCard({
  folder,
  onEdit,
  onDelete,
  onRegenerateCode,
  index
}) {
  const [copying, setCopying] = reactExports.useState(false);
  async function copyCode() {
    setCopying(true);
    await navigator.clipboard.writeText(folder.accessCode);
    ue.success("Access code copied!");
    setTimeout(() => setCopying(false), 1500);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "group bg-card border border-border rounded-sm overflow-hidden hover:border-accent/30 transition-smooth hover:shadow-elevated",
      "data-ocid": `folder.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/folders/$folderId",
            params: { folderId: folder.id },
            "data-ocid": `folder.link.${index}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-40 bg-muted overflow-hidden flex items-center justify-center cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-muted to-background/80" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-10 h-10 text-muted-foreground/40 relative z-10" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 right-3 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-3 h-3" }),
                folder.fileCount.toString(),
                " files"
              ] }) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/folders/$folderId",
                params: { folderId: folder.id },
                className: "min-w-0",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground truncate hover:text-accent transition-colors", children: folder.name })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-mono text-sm font-medium shrink-0", children: formatPrice(folder.priceInCents) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 font-mono text-xs bg-muted px-2.5 py-1.5 rounded-sm text-muted-foreground tracking-widest truncate", children: folder.accessCode }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: cn("h-7 w-7 p-0 shrink-0", copying && "text-accent"),
                onClick: copyCode,
                "aria-label": "Copy access code",
                "data-ocid": `folder.copy_code_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 pt-1 border-t border-border", children: [
            onEdit && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground",
                onClick: () => onEdit(folder),
                "data-ocid": `folder.edit_button.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3 h-3" }),
                  "Edit"
                ]
              }
            ),
            onRegenerateCode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground",
                onClick: () => onRegenerateCode(folder.id),
                "data-ocid": `folder.regenerate_code_button.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                  "New Code"
                ]
              }
            ),
            onDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-7 text-xs gap-1.5 text-muted-foreground hover:text-destructive ml-auto",
                onClick: () => onDelete(folder.id),
                "aria-label": "Delete folder",
                "data-ocid": `folder.delete_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  FolderPlus as F,
  FolderCard as a
};
