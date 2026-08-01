import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isDealer: boolean;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshRoles: () => Promise<void>;
  completeDealerRegistration: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export async function completeDealerRegistrationViaSupabase(): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const { data, error } = await supabase.rpc("complete_dealer_registration", {});

  if (error) {
    throw new Error(error.message || "Dealer registration could not be completed");
  }

  if (data && typeof data === "object" && "success" in data && !data.success) {
    throw new Error("Dealer registration could not be completed");
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isDealer, setIsDealer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshRoles = useCallback(async () => {
    if (!supabase || !session?.user) {
      setIsDealer(false);
      setIsAdmin(false);
      return;
    }

    const [{ data: adminData }, { data: dealerData }] = await Promise.all([
      supabase.rpc("check_is_admin"),
      supabase.rpc("check_is_dealer"),
    ]);

    setIsAdmin(!!adminData);
    setIsDealer(!!dealerData);
  }, [session?.user]);

  const completeDealerRegistration = useCallback(async () => {
    await completeDealerRegistrationViaSupabase();
    await refreshRoles();
  }, [refreshRoles]);

  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user) {
      setIsDealer(false);
      setIsAdmin(false);
      return;
    }
    refreshRoles();
  }, [session?.user, refreshRoles]);

  const signOut = useCallback(async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setIsDealer(false);
    setIsAdmin(false);
  }, []);

  const value = useMemo(
    () => ({
      session,
      user,
      isDealer,
      isAdmin,
      loading,
      signOut,
      refreshRoles,
      completeDealerRegistration,
    }),
    [
      session,
      user,
      isDealer,
      isAdmin,
      loading,
      signOut,
      refreshRoles,
      completeDealerRegistration,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
