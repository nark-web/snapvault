import { j as jsxRuntimeExports, c as cn, r as reactExports, S as Skeleton, a as ue } from "./index-CMPuHGe2.js";
import { c as createLucideIcon, X, L as Layout, D as DashboardHeader, B as Button, F as FolderOpen, m as motion } from "./Layout-BpCmKaPP.js";
import { R as Root, C as Content, a as Close, T as Title, D as Description, P as Portal, O as Overlay } from "./index-C7eOdyYY.js";
import { I as Input } from "./input-BIXePVsk.js";
import { L as Label } from "./label-CldE7x35.js";
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
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function FoldersPage() {
  const {
    folders,
    isLoading,
    create,
    isCreating,
    update,
    isUpdating,
    remove,
    regenerateCode
  } = useFolders();
  const [search, setSearch] = reactExports.useState("");
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [editFolder, setEditFolder] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    name: "",
    priceInDollars: ""
  });
  const [formError, setFormError] = reactExports.useState("");
  const filtered = folders.filter(
    (f) => f.name.toLowerCase().includes(search.toLowerCase())
  );
  function openCreate() {
    setForm({ name: "", priceInDollars: "" });
    setFormError("");
    setCreateOpen(true);
  }
  function openEdit(folder) {
    setForm({
      name: folder.name,
      priceInDollars: (Number(folder.priceInCents) / 100).toFixed(2)
    });
    setFormError("");
    setEditFolder(folder);
  }
  async function handleSubmitCreate(e) {
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
        priceInCents: BigInt(Math.round(price * 100))
      });
      ue.success("Gallery created!");
      setCreateOpen(false);
    } catch {
      ue.error("Failed to create gallery");
    }
  }
  async function handleSubmitEdit(e) {
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
        priceInCents: BigInt(Math.round(price * 100))
      });
      ue.success("Gallery updated!");
      setEditFolder(null);
    } catch {
      ue.error("Failed to update gallery");
    }
  }
  async function handleDelete(id) {
    if (!confirm("Delete this gallery and all its files? This cannot be undone."))
      return;
    try {
      await remove(id);
      ue.success("Gallery deleted");
    } catch {
      ue.error("Failed to delete gallery");
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ProtectedRoute, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dark p-6 sm:p-8 max-w-6xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DashboardHeader,
        {
          title: "My Galleries",
          subtitle: `${folders.length} client ${folders.length === 1 ? "gallery" : "galleries"}`,
          actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "bg-accent text-accent-foreground hover:bg-accent/90 gap-2",
              onClick: openCreate,
              "data-ocid": "folders.create_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FolderPlus, { className: "w-4 h-4" }),
                "New Gallery"
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6 max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search galleries…",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9 bg-muted/40",
            "data-ocid": "folders.search_input"
          }
        ),
        search && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSearch(""),
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
            "aria-label": "Clear search",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: ["a", "b", "c", "d", "e", "f"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-sm" }, id)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-sm",
          "data-ocid": "folders.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-12 h-12 text-muted-foreground/40 mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-2", children: search ? "No galleries match your search" : "No galleries yet" }),
            !search && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 max-w-xs", children: "Create your first gallery to start delivering photos to clients." }),
            !search && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "bg-accent text-accent-foreground hover:bg-accent/90 gap-2",
                onClick: openCreate,
                "data-ocid": "folders.create_first_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FolderPlus, { className: "w-4 h-4" }),
                  "Create Gallery"
                ]
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: filtered.map((folder, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.05 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            FolderCard,
            {
              folder,
              onEdit: openEdit,
              onDelete: handleDelete,
              onRegenerateCode: handleRegenerate,
              index: i + 1
            }
          )
        },
        folder.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: createOpen, onOpenChange: setCreateOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "dark", "data-ocid": "folder.create_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Create New Gallery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Set up a new client gallery with price and access code." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmitCreate, className: "space-y-4 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "create-name", children: "Gallery Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "create-name",
              placeholder: "e.g. Sarah & Tom Wedding 2024",
              value: form.name,
              onChange: (e) => {
                setForm((f) => ({ ...f, name: e.target.value }));
                setFormError("");
              },
              "data-ocid": "folder.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "create-price", children: "Price (USD)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "create-price",
              type: "number",
              step: "0.01",
              min: "0",
              placeholder: "49.00",
              value: form.priceInDollars,
              onChange: (e) => {
                setForm((f) => ({ ...f, priceInDollars: e.target.value }));
                setFormError("");
              },
              "data-ocid": "folder.price_input"
            }
          )
        ] }),
        formError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive",
            "data-ocid": "folder.form_error_state",
            children: formError
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              onClick: () => setCreateOpen(false),
              "data-ocid": "folder.create_cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "bg-accent text-accent-foreground hover:bg-accent/90",
              disabled: isCreating,
              "data-ocid": "folder.create_submit_button",
              children: isCreating ? "Creating…" : "Create Gallery"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!editFolder,
        onOpenChange: (open) => !open && setEditFolder(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "dark", "data-ocid": "folder.edit_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Edit Gallery" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update gallery name or price." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmitEdit, className: "space-y-4 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-name", children: "Gallery Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-name",
                  value: form.name,
                  onChange: (e) => {
                    setForm((f) => ({ ...f, name: e.target.value }));
                    setFormError("");
                  },
                  "data-ocid": "folder.edit_name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-price", children: "Price (USD)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-price",
                  type: "number",
                  step: "0.01",
                  min: "0",
                  value: form.priceInDollars,
                  onChange: (e) => {
                    setForm((f) => ({ ...f, priceInDollars: e.target.value }));
                    setFormError("");
                  },
                  "data-ocid": "folder.edit_price_input"
                }
              )
            ] }),
            formError && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": "folder.edit_form_error_state",
                children: formError
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  onClick: () => setEditFolder(null),
                  "data-ocid": "folder.edit_cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "bg-accent text-accent-foreground hover:bg-accent/90",
                  disabled: isUpdating,
                  "data-ocid": "folder.edit_submit_button",
                  children: isUpdating ? "Saving…" : "Save Changes"
                }
              )
            ] })
          ] })
        ] })
      }
    )
  ] });
}
export {
  FoldersPage as default
};
