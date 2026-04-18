import { r as reactExports, j as jsxRuntimeExports, S as Skeleton, a as ue } from "./index-CMPuHGe2.js";
import { c as createLucideIcon, p as useProfile, L as Layout, D as DashboardHeader, m as motion, U as User, B as Button } from "./Layout-BpCmKaPP.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-C9uaDqVo.js";
import { I as Input } from "./input-BIXePVsk.js";
import { L as Label } from "./label-CldE7x35.js";
import { P as ProtectedRoute } from "./ProtectedRoute-LpjurouH.js";
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function ProfilePage() {
  const { profile, isLoading, save, isSaving } = useProfile();
  const [name, setName] = reactExports.useState((profile == null ? void 0 : profile.name) ?? "");
  const [email, setEmail] = reactExports.useState((profile == null ? void 0 : profile.email) ?? "");
  const [formError, setFormError] = reactExports.useState("");
  if (profile && !name && !email) {
    setName(profile.name);
    setEmail(profile.email);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setFormError("Name is required");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setFormError("Enter a valid email address");
      return;
    }
    try {
      await save({ name: name.trim(), email: email.trim() });
      ue.success("Profile saved!");
      setFormError("");
    } catch {
      ue.error("Failed to save profile");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dark p-6 sm:p-8 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DashboardHeader,
      {
        title: "Profile",
        subtitle: "Manage your photographer profile"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-6 h-6 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display", children: "Personal Information" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Update your name and email address." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-name", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "profile-name",
                  placeholder: "Your name",
                  value: name,
                  onChange: (e) => {
                    setName(e.target.value);
                    setFormError("");
                  },
                  "data-ocid": "profile.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-email", children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "profile-email",
                  type: "email",
                  placeholder: "your@email.com",
                  value: email,
                  onChange: (e) => {
                    setEmail(e.target.value);
                    setFormError("");
                  },
                  "data-ocid": "profile.email_input"
                }
              )
            ] }),
            formError && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": "profile.form_error_state",
                children: formError
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                className: "bg-accent text-accent-foreground hover:bg-accent/90 gap-2",
                disabled: isSaving,
                "data-ocid": "profile.save_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                  isSaving ? "Saving…" : "Save Changes"
                ]
              }
            ) })
          ] }) })
        ] })
      }
    )
  ] }) }) });
}
export {
  ProfilePage as default
};
