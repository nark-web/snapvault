import { u as useNavigate, j as jsxRuntimeExports, S as Skeleton, a as ue } from "./index-CMPuHGe2.js";
import { c as createLucideIcon, L as Layout, D as DashboardHeader, B as Button, m as motion, F as FolderOpen } from "./Layout-BpCmKaPP.js";
import { P as ProtectedRoute } from "./ProtectedRoute-LpjurouH.js";
import { F as FolderPlus, a as FolderCard } from "./FolderCard-C_CfUm0z.js";
import { u as useFolders } from "./useFolders-p6R8klPp.js";
import "./badge-D4eV2U_G.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function DashboardPage() {
  const navigate = useNavigate();
  const { folders, isLoading, remove, regenerateCode } = useFolders();
  const totalFiles = folders.reduce((sum, f) => sum + Number(f.fileCount), 0);
  async function handleDelete(id) {
    if (!confirm("Delete this folder and all its files? This cannot be undone."))
      return;
    try {
      await remove(id);
      ue.success("Folder deleted");
    } catch {
      ue.error("Failed to delete folder");
    }
  }
  async function handleRegenerate(id) {
    try {
      await regenerateCode(id);
      ue.success("New access code generated");
    } catch {
      ue.error("Failed to regenerate code");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dark p-6 sm:p-8 max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DashboardHeader,
      {
        title: "Dashboard",
        subtitle: "Manage your client galleries and deliveries",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "bg-accent text-accent-foreground hover:bg-accent/90 gap-2",
            onClick: () => navigate({ to: "/folders" }),
            "data-ocid": "dashboard.create_folder_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FolderPlus, { className: "w-4 h-4" }),
              "New Folder"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8", children: [
      { label: "Total Galleries", value: folders.length.toString() },
      { label: "Total Files", value: totalFiles.toString() },
      { label: "Active Deliveries", value: folders.length.toString() }
    ].map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.08 },
        className: "bg-card border border-border rounded-sm px-4 py-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: stat.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-semibold text-foreground", children: stat.value })
        ]
      },
      stat.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-accent" }),
        "Recent Galleries"
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: ["a", "b", "c", "d"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-sm" }, id)) }) : folders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-sm",
          "data-ocid": "dashboard.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-12 h-12 text-muted-foreground/40 mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-2", children: "No galleries yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 max-w-xs", children: "Create your first client gallery to start sharing and getting paid for your work." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "bg-accent text-accent-foreground hover:bg-accent/90 gap-2",
                onClick: () => navigate({ to: "/folders" }),
                "data-ocid": "dashboard.create_first_folder_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FolderPlus, { className: "w-4 h-4" }),
                  "Create Gallery"
                ]
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: folders.slice(0, 8).map((folder, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.06 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            FolderCard,
            {
              folder,
              onEdit: () => navigate({ to: `/folders/${folder.id}` }),
              onDelete: handleDelete,
              onRegenerateCode: handleRegenerate,
              index: i + 1
            }
          )
        },
        folder.id
      )) })
    ] })
  ] }) }) });
}
export {
  DashboardPage as default
};
