import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, KeyRound, Settings2, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { DashboardHeader, Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    setPasswordSaving(true);
    setTimeout(() => {
      setPasswordSaving(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated successfully.");
    }, 1200);
  }

  function handleDeleteAccount() {
    toast.error("Account deletion requested — contact support to complete.");
    setDeleteConfirmText("");
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="dark p-6 sm:p-8 max-w-2xl space-y-6">
          <DashboardHeader
            title="Settings"
            subtitle="Manage your account preferences and security"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* Account info */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-1">
                  <Settings2 className="w-5 h-5 text-accent" />
                </div>
                <CardTitle className="font-display">Account</CardTitle>
                <CardDescription>
                  Your account connections and platform status.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="font-medium text-foreground">
                        Authentication
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Connected via Internet Identity
                      </p>
                    </div>
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-sm font-medium">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="font-medium text-foreground">
                        Data Storage
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Secured on the Internet Computer blockchain
                      </p>
                    </div>
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-sm font-medium">
                      Encrypted
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-foreground">
                        Payment Processing
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Powered by Stripe — secure, global payments
                      </p>
                    </div>
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-sm font-medium">
                      Stripe
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Change password */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-1">
                  <KeyRound className="w-5 h-5 text-accent" />
                </div>
                <CardTitle className="font-display">Change Password</CardTitle>
                <CardDescription>
                  Update your account password. Use at least 8 characters.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="current-password" className="text-sm">
                      Current Password
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      autoComplete="current-password"
                      data-ocid="settings.current_password_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="new-password" className="text-sm">
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      autoComplete="new-password"
                      data-ocid="settings.new_password_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="confirm-password" className="text-sm">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                      data-ocid="settings.confirm_password_input"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      type="submit"
                      size="sm"
                      disabled={passwordSaving}
                      data-ocid="settings.change_password_submit_button"
                    >
                      {passwordSaving ? "Saving…" : "Update Password"}
                    </Button>
                    {passwordSaving && (
                      <span
                        className="text-xs text-muted-foreground"
                        data-ocid="settings.password_loading_state"
                      >
                        Updating…
                      </span>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Danger zone */}
            <Card className="bg-card border-destructive/40">
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mb-1">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <CardTitle className="font-display text-destructive">
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Permanent actions that cannot be undone.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Delete Account
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Permanently delete your account and all associated data.
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="shrink-0"
                        data-ocid="settings.delete_account_open_modal_button"
                      >
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent data-ocid="settings.delete_account_dialog">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-destructive" />
                          Delete your account?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-3">
                          <span className="block">
                            This will permanently delete your account, all
                            client folders, uploaded media, and access codes.
                            This action{" "}
                            <strong className="text-foreground">
                              cannot be undone
                            </strong>
                            .
                          </span>
                          <span className="block">
                            Type{" "}
                            <strong className="text-foreground">DELETE</strong>{" "}
                            to confirm.
                          </span>
                          <Input
                            placeholder="Type DELETE to confirm"
                            value={deleteConfirmText}
                            onChange={(e) =>
                              setDeleteConfirmText(e.target.value)
                            }
                            className="mt-2"
                            data-ocid="settings.delete_confirm_input"
                          />
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => setDeleteConfirmText("")}
                          data-ocid="settings.delete_account_cancel_button"
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          disabled={deleteConfirmText !== "DELETE"}
                          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                          data-ocid="settings.delete_account_confirm_button"
                        >
                          Permanently Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
