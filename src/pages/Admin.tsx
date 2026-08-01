import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DealerInvite = {
  id: string;
  email: string;
  status: string;
  invited_at: string;
  registered_at: string | null;
};

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut, refreshRoles } = useAuth();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [invites, setInvites] = useState<DealerInvite[]>([]);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const [loadingInvites, setLoadingInvites] = useState(false);

  const loadInvites = async () => {
    if (!supabase || !isAdmin) return;
    setLoadingInvites(true);
    try {
      const { data, error } = await supabase
        .from("dealer_invites")
        .select("id, email, status, invited_at, registered_at")
        .order("invited_at", { ascending: false });

      if (error) throw error;
      setInvites(data ?? []);
    } catch (error) {
      console.error(error);
      toast.error("Could not load dealer invites.");
    } finally {
      setLoadingInvites(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadInvites();
    }
  }, [isAdmin]);

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

  const handleInvite = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase || !user) return;

    const email = inviteEmail.trim().toLowerCase();
    if (!email) {
      toast.error("Enter an email address.");
      return;
    }

    setIsInviting(true);
    try {
      const { error } = await supabase.from("dealer_invites").insert({
        email,
        status: "invited",
        invited_by: user.id,
      });

      if (error) throw error;
      toast.success(`Invitation recorded for ${email}`);
      setInviteEmail("");
      await loadInvites();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Could not add invite."
      );
    } finally {
      setIsInviting(false);
    }
  };

  const handleRevoke = async (id: string) => {
    if (!supabase) return;
    try {
      const { error } = await supabase
        .from("dealer_invites")
        .update({ status: "revoked" })
        .eq("id", id);
      if (error) throw error;
      toast.success("Invite revoked.");
      await loadInvites();
    } catch (error) {
      toast.error("Could not revoke invite.");
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
      <section className="py-16 bg-tactical-surface">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-wider">Dealer Admin</h1>
              <p className="text-muted-foreground">
                Approve dealer emails so they can create accounts at{" "}
                <span className="text-foreground">/dealer/signup</span>.
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

          <form
            onSubmit={handleInvite}
            className="flex flex-col sm:flex-row gap-4 mb-10 p-6 bg-tactical-dark rounded-lg border border-tactical-green-dim/30"
          >
            <div className="flex-1 space-y-2">
              <Label htmlFor="inviteEmail">Dealer email to approve</Label>
              <Input
                id="inviteEmail"
                type="email"
                placeholder="dealer@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex items-end">
              <TacticalButton type="submit" disabled={isInviting}>
                {isInviting ? "Adding..." : "Add Invite"}
              </TacticalButton>
            </div>
          </form>

          <div className="bg-tactical-dark rounded-lg border border-tactical-green-dim/30 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Invited</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invites.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-muted-foreground">
                      {loadingInvites ? "Loading..." : "No invites yet."}
                    </TableCell>
                  </TableRow>
                )}
                {invites.map((invite) => (
                  <TableRow key={invite.id}>
                    <TableCell>{invite.email}</TableCell>
                    <TableCell className="capitalize">{invite.status}</TableCell>
                    <TableCell>
                      {new Date(invite.invited_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {invite.status !== "revoked" && (
                        <button
                          type="button"
                          className="text-sm text-red-400 hover:underline"
                          onClick={() => handleRevoke(invite.id)}
                        >
                          Revoke
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Admin;
