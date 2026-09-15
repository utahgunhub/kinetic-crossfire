import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm uppercase tracking-wide px-3 py-2 rounded ${
    isActive
      ? "bg-tactical-green text-tactical-dark font-semibold"
      : "text-muted-foreground hover:text-tactical-green"
  }`;

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut, refreshRoles } = useAuth();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleAdminSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) return;

    setIsSigningIn(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail.trim(),
        password: loginPassword,
      });
      if (error) throw error;
      await refreshRoles();
      toast.success("Signed in.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Sign in failed.");
    } finally {
      setIsSigningIn(false);
    }
  };

  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <section className="py-24 container mx-auto px-6">
          <p className="text-muted-foreground">
            Configure Supabase environment variables to use the admin portal.
          </p>
        </section>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <section className="py-24 container mx-auto px-6 text-muted-foreground">
          Loading...
        </section>
        <Footer />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <section className="py-24 bg-tactical-surface">
          <div className="container mx-auto px-6 max-w-md">
            <h1 className="text-3xl font-bold mb-4">Admin Sign In</h1>
            <p className="text-muted-foreground mb-8">
              Only allowlisted Kinetic Crossfire admin emails can access this
              page.
            </p>
            <form
              onSubmit={handleAdminSignIn}
              className="space-y-4 bg-tactical-dark p-8 rounded-lg border border-tactical-green-dim/30"
            >
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminPassword">Password</Label>
                <Input
                  id="adminPassword"
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <TacticalButton type="submit" disabled={isSigningIn} className="w-full">
                {isSigningIn ? "Signing in..." : "Sign In"}
              </TacticalButton>
            </form>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="py-10 bg-tactical-surface min-h-[70vh]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-wider">Admin</h1>
              <p className="text-muted-foreground">
                Manage dealers, products, discount codes, and site traffic.
              </p>
            </div>
            <TacticalButton
              variant="secondary"
              onClick={async () => {
                await signOut();
                navigate("/");
              }}
            >
              Sign Out
            </TacticalButton>
          </div>

          <nav className="flex flex-wrap gap-2 mb-8 border-b border-tactical-green-dim/30 pb-4">
            <NavLink to="/admin" end className={navLinkClass}>
              Portal invites
            </NavLink>
            <NavLink to="/admin/map-dealers" className={navLinkClass}>
              Dealer map
            </NavLink>
            <NavLink to="/admin/products" className={navLinkClass}>
              Products
            </NavLink>
            <NavLink to="/admin/coupons" className={navLinkClass}>
              Discount codes
            </NavLink>
            <NavLink to="/admin/analytics" className={navLinkClass}>
              Analytics
            </NavLink>
          </nav>

          <Outlet />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AdminLayout;
