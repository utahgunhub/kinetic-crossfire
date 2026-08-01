import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, LogIn } from "lucide-react";

const inputClassName =
  "w-full px-4 py-3 bg-tactical-surface border border-tactical-green-dim/30 rounded-lg text-foreground placeholder-muted-foreground focus:border-tactical-green focus:outline-none focus:ring-1 focus:ring-tactical-green/40 transition-colors";

const buttonClassName =
  "w-full flex items-center justify-center gap-2 h-16 text-base";

const DealerLogin = () => {
  const navigate = useNavigate();
  const { completeDealerRegistration } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isSupabaseConfigured() || !supabase) {
      toast.error("Dealer login is not configured yet.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;
      if (!data.session) throw new Error("Sign in did not return a session.");

      try {
        await completeDealerRegistration();
      } catch (regError) {
        await supabase.auth.signOut();
        throw regError;
      }

      toast.success("Signed in with dealer pricing.");
      navigate("/shop");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Unable to sign in."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative py-20 md:py-28 bg-tactical-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(102,204,230,0.12),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(102,204,230,0.08),transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-tactical-green mb-4">
              Authorized dealer program
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-wider mb-6">
              Dealer Portal
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Apply for authorized dealer status or sign in to access your
              dealership account and order through Kinetic Crossfire.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-tactical-surface">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 lg:items-stretch lg:rounded-2xl lg:border lg:border-tactical-green-dim/30 lg:bg-tactical-dark lg:overflow-hidden lg:shadow-[0_0_60px_-12px_rgba(102,204,230,0.15)]">
              {/* Left — sign in */}
              <div className="p-8 md:p-10 lg:p-12 lg:border-r lg:border-tactical-green-dim/20 flex flex-col h-full min-h-[32rem]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-tactical-green/30 bg-tactical-green/10">
                    <LogIn className="h-6 w-6 text-tactical-green" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-tactical-green">
                      Approved dealers
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-wider">
                      Sign In
                    </h2>
                  </div>
                </div>

                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Use the email address Kinetic Crossfire approved for your
                  dealership.{" "}
                  <Link
                    to="/dealer/signup"
                    className="text-tactical-green font-medium hover:underline"
                  >
                    Create your account
                  </Link>{" "}
                  after you receive approval.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                  <div className="space-y-5 flex-1">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClassName}
                      placeholder="you@yourdealership.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={inputClassName}
                      placeholder="••••••••"
                    />
                  </div>
                  </div>
                  <div className="pt-8 mt-auto">
                  <TacticalButton
                    type="submit"
                    disabled={isSubmitting}
                    className={buttonClassName}
                    size="lg"
                  >
                    {isSubmitting ? "Signing in..." : "Access Dealer Pricing"}
                  </TacticalButton>
                  </div>
                </form>
              </div>

              {/* Right — apply */}
              <div className="relative flex flex-col h-full min-h-[32rem] overflow-hidden rounded-2xl border border-tactical-green-dim/30 bg-tactical-dark lg:rounded-none lg:border-0">
                <div className="relative h-48 md:h-56 lg:h-52 shrink-0">
                  <img
                    src="/thompson-frt/new-product-image.webp"
                    alt="Thompson Blow Back Trigger Gen II"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-tactical-dark via-tactical-dark/70 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="inline-block bg-tactical-green/20 text-tactical-green border border-tactical-green/40 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-2">
                      New dealers
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-wider leading-tight">
                      Apply to Become a Dealer
                    </h2>
                  </div>
                </div>

                <div className="p-8 md:p-10 flex flex-col flex-1 min-h-0 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-tactical-green/5 rounded-full blur-3xl pointer-events-none" />

                  <p className="text-muted-foreground leading-relaxed flex-1">
                    Submit the dealer agreement and business details. We review
                    every application and contact you when you&apos;re cleared to
                    open your portal account and access authorized dealer pricing.
                  </p>

                  <Link to="/dealership" className="block pt-8 mt-auto">
                    <TacticalButton
                      variant="primary"
                      size="lg"
                      className={`${buttonClassName} group`}
                    >
                      Start Dealer Application
                      <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                    </TacticalButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DealerLogin;
