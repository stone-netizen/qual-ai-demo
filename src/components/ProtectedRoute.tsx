import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, role, authError } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background animated-gradient">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground font-black uppercase tracking-widest text-[10px]">Verifying Identity...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If role is null after loading, it means the profile table/row is missing
  if (user && role === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background animated-gradient p-4">
        <div className="max-w-md w-full text-center space-y-6 glass-strong p-8 rounded-3xl border border-red-500/20">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-black uppercase italic text-white">Account Not Authorized</h2>
          <div className="text-left bg-black/50 p-4 rounded-xl border border-white/10 text-xs font-mono space-y-2 overflow-auto max-h-64">
            <p className="text-slate-400">Diagnostic Info:</p>
            <div className="space-y-1 text-slate-300">
              <p>User ID: <span className="text-emerald-500">{user.id}</span></p>
              <p>Email: <span className="text-emerald-500">{user.email}</span></p>
              <p>Role State: <span className="text-yellow-500">{role === null ? 'NULL' : role}</span></p>
              <p>Auth Error: <span className="text-red-500">{authError || 'None'}</span></p>
            </div>

            <button
              onClick={async () => {
                // Direct diagnostic query
                const { supabase } = await import("@/integrations/supabase/client");
                console.log("Running diag...");
                const { data, error } = await supabase.from('profiles').select('*').eq('user_id', user.id);
                alert(`Direct Query Result:\nRows: ${data?.length}\nError: ${error?.message || 'None'}\nFirst Row: ${JSON.stringify(data?.[0])}`);
              }}
              className="mt-2 text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-white"
            >
              Run Live DB Check
            </button>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => window.location.reload()} variant="default" className="bg-emerald-500 text-black hover:bg-emerald-400">
            Retry Connection
          </Button>
          <Button onClick={() => window.location.href = "/auth"} variant="outline" className="border-white/10 text-white hover:bg-white/5">
            Return to Login
          </Button>
        </div>
      </div>
    );
  }

  // If role is set but not allowed
  if (user && role !== 'setter' && role !== 'admin') {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
