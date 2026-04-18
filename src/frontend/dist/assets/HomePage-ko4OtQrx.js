import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-CMPuHGe2.js";
import { c as createLucideIcon, u as useAuth, L as Layout, m as motion, C as Camera, B as Button } from "./Layout-BpCmKaPP.js";
import { I as Input } from "./input-BIXePVsk.js";
import { L as Lock } from "./lock-CP5XiCY3.js";
import { C as CircleCheckBig } from "./circle-check-big-DcPkV6Lg.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$1);
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
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const FEATURES = [
  {
    icon: Lock,
    title: "Secure Delivery",
    desc: "Each client gallery is protected by a unique access code. No account needed for clients."
  },
  {
    icon: Zap,
    title: "Instant Access",
    desc: "Clients pay once and get immediate download access to their full resolution images."
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    desc: "Generate a shareable code in seconds. Send it via email, text, or any messaging app."
  },
  {
    icon: Shield,
    title: "Payment Protected",
    desc: "Powered by Stripe. Accept cards globally. Get paid before clients download their files."
  }
];
function HomePage() {
  const { isAuthenticated, login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = reactExports.useState("");
  const [codeError, setCodeError] = reactExports.useState("");
  function handleCodeSubmit(e) {
    e.preventDefault();
    const trimmed = accessCode.trim().toUpperCase();
    if (!trimmed) {
      setCodeError("Please enter an access code");
      return;
    }
    navigate({ to: `/access/${trimmed}` });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showSidebar: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/generated/hero-snapvault.dim_1200x675.jpg",
            alt: "",
            className: "w-full h-full object-cover",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/75" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-3xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-medium mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-3.5 h-3.5" }),
              "Professional Photo Delivery Platform"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.h1,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.1 },
            className: "font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight mb-6",
            children: [
              "Deliver. Share. ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Get Paid." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto",
            children: "Upload client galleries, set your price, and share a unique code. Clients pay once — then instantly download their full-resolution photos."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.3 },
            className: "flex flex-col sm:flex-row items-center justify-center gap-3 mb-16",
            children: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                className: "bg-accent text-accent-foreground hover:bg-accent/90 gap-2 px-8",
                onClick: () => navigate({ to: "/dashboard" }),
                "data-ocid": "hero.go_to_dashboard_button",
                children: [
                  "Go to Dashboard",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "bg-accent text-accent-foreground hover:bg-accent/90 gap-2 px-8",
                  onClick: login,
                  disabled: isLoading,
                  "data-ocid": "hero.signup_button",
                  children: [
                    "Start for Free",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  className: "border-border/60 hover:border-accent/40 px-8",
                  onClick: login,
                  disabled: isLoading,
                  "data-ocid": "hero.login_button",
                  children: "Sign In"
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.4 },
            className: "bg-card/80 backdrop-blur border border-border rounded-sm p-5 max-w-md mx-auto",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3 font-medium", children: "Have an access code from your photographer?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCodeSubmit, className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      placeholder: "Enter access code",
                      value: accessCode,
                      onChange: (e) => {
                        setAccessCode(e.target.value.toUpperCase());
                        setCodeError("");
                      },
                      className: "font-mono tracking-widest text-center uppercase bg-muted/50 border-border focus:border-accent",
                      maxLength: 16,
                      "data-ocid": "hero.access_code_input"
                    }
                  ),
                  codeError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-destructive mt-1.5",
                      "data-ocid": "hero.code_error_state",
                      children: codeError
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "bg-accent text-accent-foreground hover:bg-accent/90 shrink-0",
                    "data-ocid": "hero.access_code_submit_button",
                    children: "View Gallery"
                  }
                )
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/20 border-t border-border py-20 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-semibold text-foreground mb-3", children: "Everything you need to deliver your work" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-lg mx-auto", children: "A streamlined platform built for photographers who value their time and their clients." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: FEATURES.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "bg-card border border-border rounded-sm p-6 hover:border-accent/30 transition-smooth hover:shadow-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "w-5 h-5 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-2", children: f.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: f.desc })
          ]
        },
        f.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background border-t border-border py-20 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-accent mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4", children: "Ready to simplify client delivery?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "Join photographers who use SnapVault to deliver stunning work and get paid faster." }),
          !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "bg-accent text-accent-foreground hover:bg-accent/90 gap-2 px-10",
              onClick: login,
              "data-ocid": "cta.signup_button",
              children: [
                "Get Started Free",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          )
        ]
      }
    ) }) })
  ] }) });
}
export {
  HomePage as default
};
