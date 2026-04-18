import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-CMPuHGe2.js";
import { c as createLucideIcon, a as useActor, y as apiVerifyPayment, L as Layout, m as motion, B as Button, g as createActor } from "./Layout-BpCmKaPP.js";
import { C as CircleCheckBig } from "./circle-check-big-DcPkV6Lg.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("session_id") ?? "";
  const folderId = urlParams.get("folder_id") ?? "";
  const [status, setStatus] = reactExports.useState("verifying");
  const [downloadToken, setDownloadToken] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!actor || isFetching || !sessionId) return;
    apiVerifyPayment(actor, sessionId).then((result) => {
      if (result.__kind__ === "granted") {
        setDownloadToken(result.granted.downloadToken);
        setStatus("success");
      } else if (result.__kind__ === "failed") {
        setStatus("failed");
      } else {
        setTimeout(() => {
          apiVerifyPayment(actor, sessionId).then((r) => {
            if (r.__kind__ === "granted") {
              setDownloadToken(r.granted.downloadToken);
              setStatus("success");
            } else {
              setStatus("failed");
            }
          });
        }, 2e3);
      }
    }).catch(() => setStatus("failed"));
  }, [actor, isFetching, sessionId]);
  function goToDownload() {
    if (!downloadToken || !folderId) return;
    window.location.href = `/download/${folderId}?token=${encodeURIComponent(downloadToken)}`;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showSidebar: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dark min-h-screen flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      className: "bg-card border border-border rounded-sm p-10 text-center max-w-sm w-full shadow-elevated",
      "data-ocid": "payment.status_card",
      children: [
        status === "verifying" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-12 h-12 text-accent mx-auto mb-4 animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "Verifying Payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm text-muted-foreground",
              "data-ocid": "payment.loading_state",
              children: "Please wait while we confirm your payment…"
            }
          )
        ] }),
        status === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 text-accent mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "Payment Successful!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm text-muted-foreground mb-6",
              "data-ocid": "payment.success_state",
              children: "Your payment has been confirmed. Click below to access your gallery."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full bg-accent text-accent-foreground hover:bg-accent/90",
              onClick: goToDownload,
              "data-ocid": "payment.view_gallery_button",
              children: "View & Download Gallery"
            }
          )
        ] }),
        status === "failed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-12 h-12 text-destructive mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "Payment Issue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm text-muted-foreground mb-6",
              "data-ocid": "payment.error_state",
              children: "We couldn't verify your payment. Please contact your photographer for assistance."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "w-full",
              onClick: () => navigate({ to: "/" }),
              "data-ocid": "payment.back_home_button",
              children: "Return Home"
            }
          )
        ] })
      ]
    }
  ) }) });
}
export {
  PaymentSuccessPage as default
};
