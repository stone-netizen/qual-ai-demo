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
  // MOCKED AUTH STATE for "Offline/Demo" Mode
  const mockUser = { id: 'mock-user-id', email: 'demo@profitpulse.ai' } as User;

  const user = mockUser;
  const session = { user: mockUser } as Session;
  const role = 'setter';
  const loading = false;
  const authError = null;

  const signUp = async (email: string, password: string) => {
    console.log("Mock SignUp", email);
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    console.log("Mock SignIn", email);
    return { error: null };
  };

  const signOut = async () => {
    console.log("Mock SignOut");
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
