import { d as useParams, u as useNavigate, r as reactExports, a as ue, j as jsxRuntimeExports, S as Skeleton } from "./index-CMPuHGe2.js";
import { c as createLucideIcon, a as useActor, w as apiValidateDownloadToken, h as apiFileList, L as Layout, B as Button, m as motion, g as createActor } from "./Layout-BpCmKaPP.js";
import { I as Image, F as FileCard } from "./FileCard-B_9rsziq.js";
import "./badge-D4eV2U_G.js";
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
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode);
function ClientDownloadPage() {
  const { folderId } = useParams({ from: "/download/$folderId" });
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const token = new URLSearchParams(window.location.search).get("token") ?? "";
  const [files, setFiles] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [unauthorized, setUnauthorized] = reactExports.useState(false);
  reactExports.useEffect(() => {
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
          folderId
        );
        if (!valid) {
          setUnauthorized(true);
          setLoading(false);
          return;
        }
        const fileList = await apiFileList(actor, folderId);
        setFiles(fileList);
      } catch {
        ue.error("Failed to load gallery");
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
    ue.success(`Downloading ${files.length} files`);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showSidebar: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dark min-h-screen p-6", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-6xl mx-auto space-y-4",
      "data-ocid": "download.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-64" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", children: ["a", "b", "c", "d", "e", "f"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-sm" }, id)) })
      ]
    }
  ) : unauthorized ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center min-h-[60vh] text-center",
      "data-ocid": "download.error_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-12 h-12 text-muted-foreground/40 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "Access Required" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-xs", children: "This gallery requires a valid payment. Please use your access code to proceed." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => navigate({ to: "/" }),
            "data-ocid": "download.back_home_button",
            children: "Return Home"
          }
        )
      ]
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-semibold text-foreground", children: "Your Gallery" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              files.length,
              " ",
              files.length === 1 ? "photo" : "photos",
              " ready to download"
            ] })
          ] }),
          files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "bg-accent text-accent-foreground hover:bg-accent/90 gap-2",
              onClick: handleDownloadAll,
              "data-ocid": "download.download_all_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
                "Download All (",
                files.length,
                ")"
              ]
            }
          )
        ]
      }
    ),
    files.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-sm",
        "data-ocid": "download.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-10 h-10 text-muted-foreground/40 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No files in this gallery yet" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3", children: files.map((file, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { delay: i * 0.03 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCard, { file, downloadToken: token, index: i + 1 })
      },
      file.id
    )) })
  ] }) }) });
}
export {
  ClientDownloadPage as default
};
