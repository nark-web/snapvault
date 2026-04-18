import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate, useParams } from "@tanstack/react-router";
import { AlertCircle, Camera, CreditCard, Lock } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { Layout } from "../components/Layout";
import { apiCreateCheckout, apiValidateAccessCode } from "../lib/api";
import { formatPrice } from "../lib/utils";
import type { AccessCodeResult } from "../types";

export default function ClientAccessPage() {
  const { code } = useParams({ from: "/access/$code" });
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);

  const [accessResult, setAccessResult] = useState<AccessCodeResult | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    if (!actor || isFetching) return;
    setLoading(true);
    apiValidateAccessCode(actor, code)
      .then((result) => {
        if (!result) {
          setNotFound(true);
        } else {
          setAccessResult(result);
          // Already paid — redirect to download
          if (result.isPaid && result.downloadToken) {
            window.location.href = `/download/${result.folder.id}?token=${encodeURIComponent(result.downloadToken)}`;
            return;
          }
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
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
        cancelUrl,
      });
      window.location.href = sessionUrl;
    } catch {
      toast.error("Failed to start checkout. Please try again.");
      setIsPaying(false);
    }
  }

  return (
    <Layout showSidebar={false}>
      <div className="dark min-h-screen flex items-center justify-center p-6">
        {loading ? (
          <div
            className="w-full max-w-md space-y-4"
            data-ocid="client.loading_state"
          >
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-48 w-full" />
          </div>
        ) : notFound || !accessResult ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-sm"
            data-ocid="client.error_state"
          >
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              Invalid Access Code
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              This access code is invalid or has expired. Please check with your
              photographer.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/" })}
              data-ocid="client.back_home_button"
            >
              Return Home
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="bg-card border border-border rounded-sm overflow-hidden shadow-elevated">
              {/* Header */}
              <div className="bg-muted/40 px-6 py-5 border-b border-border text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-6 h-6 text-accent" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {accessResult.folder.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {accessResult.folder.fileCount.toString()} photos ready for
                  download
                </p>
              </div>

              {/* Content */}
              <div className="px-6 py-6 text-center space-y-5">
                <div className="bg-muted/30 rounded-sm px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    One-time price
                  </p>
                  <p className="font-display text-3xl font-bold text-foreground">
                    {formatPrice(accessResult.folder.priceInCents)}
                  </p>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 justify-center">
                    <Lock className="w-3.5 h-3.5 text-accent" />
                    Full-resolution downloads included
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <CreditCard className="w-3.5 h-3.5 text-accent" />
                    Secure payment powered by Stripe
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                  onClick={handleCheckout}
                  disabled={isPaying}
                  data-ocid="client.checkout_button"
                >
                  {isPaying ? (
                    "Redirecting to checkout…"
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Pay & Download Gallery
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground">
                  You'll be redirected to a secure Stripe checkout page
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
