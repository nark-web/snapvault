import { Button } from "@/components/ui/button";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { createActor } from "../backend";
import { Layout } from "../components/Layout";
import { apiVerifyPayment } from "../lib/api";

type PaymentStatus = "verifying" | "success" | "failed";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);

  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("session_id") ?? "";
  const folderId = urlParams.get("folder_id") ?? "";

  const [status, setStatus] = useState<PaymentStatus>("verifying");
  const [downloadToken, setDownloadToken] = useState<string | null>(null);

  useEffect(() => {
    if (!actor || isFetching || !sessionId) return;
    apiVerifyPayment(actor, sessionId)
      .then((result) => {
        if (result.__kind__ === "granted") {
          setDownloadToken(result.granted.downloadToken);
          setStatus("success");
        } else if (result.__kind__ === "failed") {
          setStatus("failed");
        } else {
          // Still pending — poll once more after 2s
          setTimeout(() => {
            apiVerifyPayment(actor, sessionId).then((r) => {
              if (r.__kind__ === "granted") {
                setDownloadToken(r.granted.downloadToken);
                setStatus("success");
              } else {
                setStatus("failed");
              }
            });
          }, 2000);
        }
      })
      .catch(() => setStatus("failed"));
  }, [actor, isFetching, sessionId]);

  function goToDownload() {
    if (!downloadToken || !folderId) return;
    window.location.href = `/download/${folderId}?token=${encodeURIComponent(downloadToken)}`;
  }

  return (
    <Layout showSidebar={false}>
      <div className="dark min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border rounded-sm p-10 text-center max-w-sm w-full shadow-elevated"
          data-ocid="payment.status_card"
        >
          {status === "verifying" && (
            <>
              <Loader2 className="w-12 h-12 text-accent mx-auto mb-4 animate-spin" />
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                Verifying Payment
              </h2>
              <p
                className="text-sm text-muted-foreground"
                data-ocid="payment.loading_state"
              >
                Please wait while we confirm your payment…
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                Payment Successful!
              </h2>
              <p
                className="text-sm text-muted-foreground mb-6"
                data-ocid="payment.success_state"
              >
                Your payment has been confirmed. Click below to access your
                gallery.
              </p>
              <Button
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={goToDownload}
                data-ocid="payment.view_gallery_button"
              >
                View & Download Gallery
              </Button>
            </>
          )}

          {status === "failed" && (
            <>
              <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                Payment Issue
              </h2>
              <p
                className="text-sm text-muted-foreground mb-6"
                data-ocid="payment.error_state"
              >
                We couldn't verify your payment. Please contact your
                photographer for assistance.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate({ to: "/" })}
                data-ocid="payment.back_home_button"
              >
                Return Home
              </Button>
            </>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
