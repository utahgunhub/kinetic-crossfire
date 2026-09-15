import { TacticalButton } from "@/components/TacticalButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
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

const AdminInvites = () => {
  const { user, isAdmin } = useAuth();
  const [inviteEmail, setInviteEmail] = useState("");
  const [invites, setInvites] = useState<DealerInvite[]>([]);
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
      void loadInvites();
    }
  }, [isAdmin]);

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

  return (
    <>
      <p className="text-muted-foreground mb-6">
        Approve dealer emails so they can create wholesale accounts at{" "}
        <span className="text-foreground">/dealer/signup</span>. This is separate
        from the public dealer locator map.
      </p>

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
    </>
  );
};

export default AdminInvites;
