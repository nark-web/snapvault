import { d as useParams, u as useNavigate, r as reactExports, j as jsxRuntimeExports, S as Skeleton, f as formatPrice, a as ue } from "./index-CMPuHGe2.js";
import { c as createLucideIcon, a as useActor, t as apiValidateAccessCode, L as Layout, m as motion, B as Button, C as Camera, v as apiCreateCheckout, g as createActor } from "./Layout-BpCmKaPP.js";
import { L as Lock } from "./lock-CP5XiCY3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode);
function ClientAccessPage() {
  const { code } = useParams({ from: "/access/$code" });
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const [accessResult, setAccessResult] = reactExports.useState(
    null
  );
  const [loading, setLoading] = reactExports.useState(true);
  const [notFound, setNotFound] = reactExports.useState(false);
  const [isPaying, setIsPaying] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!actor || isFetching) return;
    setLoading(true);
    apiValidateAccessCode(actor, code).then((result) => {
      if (!result) {
        setNotFound(true);
      } else {
        setAccessResult(result);
        if (result.isPaid && result.downloadToken) {
          window.location.href = `/download/${result.folder.id}?token=${encodeURIComponent(result.downloadToken)}`;
          return;
        }
      }
    }).catch(() => setNotFound(true)).finally(() => setLoading(false));
  }, [actor, isFetching, code]);
  async function handleCheckout() {
    if (!actor || !accessResult) return;
    setIsPaying(true);
    try {
      const successUrl = `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&folder_id=${accessResult.folder.id}`;
      const cancelUrl = `${window.location.origin}/access/${code}`;
      const sessionUrl = await apiCreateCheckout(actor, {
        folderId: accessResult.folder.id,
        successUrl,
        cancelUrl
      });
      window.location.href = sessionUrl;
    } catch {
      ue.error("Failed to start checkout. Please try again.");
      setIsPaying(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showSidebar: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dark min-h-screen flex items-center justify-center p-6", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "w-full max-w-md space-y-4",
      "data-ocid": "client.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-64 mx-auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" })
      ]
    }
  ) : notFound || !accessResult ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "text-center max-w-sm",
      "data-ocid": "client.error_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-12 h-12 text-destructive mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "Invalid Access Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "This access code is invalid or has expired. Please check with your photographer." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => navigate({ to: "/" }),
            "data-ocid": "client.back_home_button",
            children: "Return Home"
          }
        )
      ]
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "w-full max-w-md",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-sm overflow-hidden shadow-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 px-6 py-5 border-b border-border text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: accessResult.folder.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
            accessResult.folder.fileCount.toString(),
            " photos ready for download"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-6 text-center space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-sm px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "One-time price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl font-bold text-foreground", children: formatPrice(accessResult.folder.priceInCents) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 text-accent" }),
              "Full-resolution downloads included"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-3.5 h-3.5 text-accent" }),
              "Secure payment powered by Stripe"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2",
              onClick: handleCheckout,
              disabled: isPaying,
              "data-ocid": "client.checkout_button",
              children: isPaying ? "Redirecting to checkout…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
                "Pay & Download Gallery"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "You'll be redirected to a secure Stripe checkout page" })
        ] })
      ] })
    }
  ) }) });
}
export {
  ClientAccessPage as default
};
