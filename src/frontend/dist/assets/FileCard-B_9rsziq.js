import { i as isImageType, h as isVideoType, j as jsxRuntimeExports, k as formatFileSize } from "./index-CMPuHGe2.js";
import { T as Trash2, B as Badge } from "./badge-D4eV2U_G.js";
import { c as createLucideIcon, B as Button } from "./Layout-BpCmKaPP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$1);
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
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
];
const Video = createLucideIcon("video", __iconNode);
function FileCard({
  file,
  onDelete,
  isDeleting,
  downloadToken,
  index
}) {
  const isImage = isImageType(file.mimeType);
  const isVideo = isVideoType(file.mimeType);
  const url = file.blob.getDirectURL();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "group relative bg-card border border-border rounded-sm overflow-hidden hover:border-accent/40 transition-smooth hover:shadow-elevated",
      "data-ocid": `file.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square bg-muted overflow-hidden", children: [
          isImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: url,
              alt: file.name,
              className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
              loading: "lazy"
            }
          ) : isVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              src: url,
              className: "w-full h-full object-cover",
              preload: "metadata",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center gap-2", children: [
            downloadToken && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: url,
                download: file.name,
                className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent text-accent-foreground text-xs font-medium rounded-sm hover:bg-accent/90 transition-colors",
                "data-ocid": `file.download_button.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                  "Download"
                ]
              }
            ),
            onDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                size: "sm",
                className: "h-7 px-2 text-xs",
                onClick: () => onDelete(file.id),
                disabled: isDeleting,
                "data-ocid": `file.delete_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: isVideo && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs px-1.5 py-0.5 gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-3 h-3" }),
            "Video"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm font-medium text-foreground truncate",
              title: file.name,
              children: file.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatFileSize(file.size) })
        ] })
      ]
    }
  );
}
export {
  FileCard as F,
  Image as I
};
