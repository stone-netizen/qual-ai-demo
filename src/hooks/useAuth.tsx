import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: string | null;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Handle Auth State Changes
  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (event === 'SIGNED_OUT' || !session) {
          setRole(null);
          setLoading(false);
        } else if (event === 'SIGNED_IN') {
          // Reset loading on sign in to ensure we wait for profile (optional, but good for UX)
          // But ensure we don't block if profile fetch fails (handled in profile effect)
          setLoading(true);
          setRole(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch Profile when Session is available
  useEffect(() => {
    let mounted = true;

    const getProfile = async () => {
      if (!session?.user) return;

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching profile:", error);
          setAuthError(error.message);
        }

        if (data) {
          if (mounted) {
            // If role is null in DB, default to 'setter' to fix stuck users
            const safeRole = (data as any).role || 'setter';
            setRole(safeRole);
            setAuthError(null);
          }
        } else {
          // Profile missing? Attempt to create one (fallback for broken triggers)
          console.log("Profile missing, attempting to create default...");
          const { data: newProfile, error: createError } = await supabase
            .from("profiles")
            .insert({
              user_id: session.user.id,
              email: session.user.email,
              role: 'setter'
            })
            .select("role")
            .single();

          if (createError) {
            console.error("Failed to create fallback profile:", createError);
            setAuthError(`Creation Failed: ${createError.message}`);
          } else if (mounted && newProfile) {
            setRole((newProfile as any).role);
            setAuthError(null);
          }
        }
      } catch (err: any) {
        console.error("Error in profile flow:", err);
        setAuthError(err.message || "Unknown error in profile fetch");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (session?.user) {
      getProfile();
    }

    // Safety timeout: If auth/profile takes longer than 5 seconds, force loading to false
    const safetyTimeout = setTimeout(() => {
      if (mounted && loading) {
        console.warn("Auth check timed out, forcing loading false");
        setLoading(false);
      }
    }, 5000);

    return () => {
      mounted = false;
      clearTimeout(safetyTimeout);
    };
  }, [session, loading]);

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, role, signUp, signIn, signOut, authError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
