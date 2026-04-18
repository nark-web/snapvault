import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Camera,
  CheckCircle,
  Lock,
  Share2,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../hooks/useAuth";

const FEATURES = [
  {
    icon: Lock,
    title: "Secure Delivery",
    desc: "Each client gallery is protected by a unique access code. No account needed for clients.",
  },
  {
    icon: Zap,
    title: "Instant Access",
    desc: "Clients pay once and get immediate download access to their full resolution images.",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    desc: "Generate a shareable code in seconds. Send it via email, text, or any messaging app.",
  },
  {
    icon: Shield,
    title: "Payment Protected",
    desc: "Powered by Stripe. Accept cards globally. Get paid before clients download their files.",
  },
];

export default function HomePage() {
  const { isAuthenticated, login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState("");
  const [codeError, setCodeError] = useState("");

  function handleCodeSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = accessCode.trim().toUpperCase();
    if (!trimmed) {
      setCodeError("Please enter an access code");
      return;
    }
    navigate({ to: `/access/${trimmed}` });
  }

  return (
    <Layout showSidebar={false}>
      <div className="dark">
        {/* Hero */}
        <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/generated/hero-snapvault.dim_1200x675.jpg"
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-background/75" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-medium mb-8"
            >
              <Camera className="w-3.5 h-3.5" />
              Professional Photo Delivery Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight mb-6"
            >
              Deliver. Share. <span className="text-accent">Get Paid.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto"
            >
              Upload client galleries, set your price, and share a unique code.
              Clients pay once — then instantly download their full-resolution
              photos.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
            >
              {isAuthenticated ? (
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 px-8"
                  onClick={() => navigate({ to: "/dashboard" })}
                  data-ocid="hero.go_to_dashboard_button"
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <>
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 px-8"
                    onClick={login}
                    disabled={isLoading}
                    data-ocid="hero.signup_button"
                  >
                    Start for Free
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border/60 hover:border-accent/40 px-8"
                    onClick={login}
                    disabled={isLoading}
                    data-ocid="hero.login_button"
                  >
                    Sign In
                  </Button>
                </>
              )}
            </motion.div>

            {/* Client access code */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card/80 backdrop-blur border border-border rounded-sm p-5 max-w-md mx-auto"
            >
              <p className="text-sm text-muted-foreground mb-3 font-medium">
                Have an access code from your photographer?
              </p>
              <form onSubmit={handleCodeSubmit} className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Enter access code"
                    value={accessCode}
                    onChange={(e) => {
                      setAccessCode(e.target.value.toUpperCase());
                      setCodeError("");
                    }}
                    className="font-mono tracking-widest text-center uppercase bg-muted/50 border-border focus:border-accent"
                    maxLength={16}
                    data-ocid="hero.access_code_input"
                  />
                  {codeError && (
                    <p
                      className="text-xs text-destructive mt-1.5"
                      data-ocid="hero.code_error_state"
                    >
                      {codeError}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0"
                  data-ocid="hero.access_code_submit_button"
                >
                  View Gallery
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-muted/20 border-t border-border py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-3">
                Everything you need to deliver your work
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                A streamlined platform built for photographers who value their
                time and their clients.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-sm p-6 hover:border-accent/30 transition-smooth hover:shadow-card"
                >
                  <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-background border-t border-border py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <CheckCircle className="w-10 h-10 text-accent mx-auto mb-4" />
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4">
                Ready to simplify client delivery?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join photographers who use SnapVault to deliver stunning work
                and get paid faster.
              </p>
              {!isAuthenticated && (
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 px-10"
                  onClick={login}
                  data-ocid="cta.signup_button"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
