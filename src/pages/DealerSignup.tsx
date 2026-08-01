import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { completeDealerRegistrationViaSupabase } from "@/contexts/AuthContext";

const DealerSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isSupabaseConfigured() || !supabase) {
      toast.error("Dealer signup is not configured yet.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
      });

      if (error) throw error;

      let session = data.session;
      if (!session) {
        const { data: signInData, error: signInError } =
          await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password,
          });
        if (signInError) throw signInError;
        session = signInData.session;
      }

      if (!session) {
        throw new Error(
          "Account was created but could not be signed in. Contact support."
        );
      }

      try {
        await completeDealerRegistrationViaSupabase();
      } catch (regError) {
        await supabase.auth.signOut();
        throw regError;
      }

      toast.success("Dealer account created. Welcome!");
      navigate("/shop");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Unable to create account."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="py-24 bg-tactical-surface">
        <div className="container mx-auto px-6 max-w-md">
          <h1 className="text-3xl font-bold text-foreground tracking-wider mb-2">
            Dealer Sign Up
          </h1>
          <p className="text-muted-foreground mb-8">
            Use the same email address an administrator added after approving
            your dealer application.
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-tactical-dark p-8 rounded-lg border border-tactical-green-dim/30"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Approved email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <TacticalButton type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Creating account..." : "Create Account"}
            </TacticalButton>
          </form>
          <p className="text-sm text-muted-foreground mt-6 text-center">
            Already have an account?{" "}
            <Link to="/dealer/login" className="text-tactical-green hover:underline">
              Dealer login
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DealerSignup;
