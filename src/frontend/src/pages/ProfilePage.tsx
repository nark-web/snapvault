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
import { Skeleton } from "@/components/ui/skeleton";
import { Save, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { DashboardHeader, Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useProfile } from "../hooks/useAuth";

export default function ProfilePage() {
  const { profile, isLoading, save, isSaving } = useProfile();
  const [name, setName] = useState(profile?.name ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [formError, setFormError] = useState("");

  // Sync form when profile loads
  if (profile && !name && !email) {
    setName(profile.name);
    setEmail(profile.email);
  }

  async function handleSubmit(e: React.FormEvent) {
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
      toast.success("Profile saved!");
      setFormError("");
    } catch {
      toast.error("Failed to save profile");
    }
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="dark p-6 sm:p-8 max-w-2xl">
          <DashboardHeader
            title="Profile"
            subtitle="Manage your photographer profile"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                  <User className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="font-display">
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your name and email address.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="profile-name">Full Name</Label>
                      <Input
                        id="profile-name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setFormError("");
                        }}
                        data-ocid="profile.name_input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="profile-email">Email Address</Label>
                      <Input
                        id="profile-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setFormError("");
                        }}
                        data-ocid="profile.email_input"
                      />
                    </div>
                    {formError && (
                      <p
                        className="text-xs text-destructive"
                        data-ocid="profile.form_error_state"
                      >
                        {formError}
                      </p>
                    )}
                    <div className="flex justify-end pt-2">
                      <Button
                        type="submit"
                        className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                        disabled={isSaving}
                        data-ocid="profile.save_button"
                      >
                        <Save className="w-4 h-4" />
                        {isSaving ? "Saving…" : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
