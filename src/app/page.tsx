import { LivenessContainer } from "@/components/liveness/LivenessContainer";
import { AppFooter } from "@/components/AppFooter";
import { LoginScreen } from "@/components/auth/LoginScreen";
import { VerifiedDashboard } from "@/components/verification/VerifiedDashboard";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (error) {
    // Keep user as null if token is invalid
    console.warn("Auth check failed (likely invalid token):", error);
  }

  // If user is logged in, check verification status
  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("verifylive_profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  const isVerified = profile?.is_verified === true;

  return (
    <main className="min-h-screen flex flex-col">
      {/* Auth Guard */}
      {user ? (
        <div className="flex-1 w-full flex flex-col">
            {/* Header / Nav could go here */}
            
            {isVerified ? (
                // ✅ ALREADY VERIFIED -> Show Dashboard
                <div className="flex-1 flex items-center justify-center">
                    <VerifiedDashboard user={user} profile={profile} />
                </div>
            ) : (
                // ❌ NOT VERIFIED -> Show Flow
                <div className="flex-1 w-full">
                    {/* User Info Header (Only for Unverified Flow) */}
                    <div className="w-full max-w-2xl mx-auto px-4 pt-6 flex justify-between items-center animate-in fade-in">
                        <div className="flex items-center gap-3">
                           {user.user_metadata?.avatar_url && (
                               <img src={user.user_metadata.avatar_url} alt="Profile" className="w-8 h-8 rounded-full border border-gray-700" />
                           )}
                           <span className="text-sm font-medium text-muted-foreground">
                               {user.user_metadata?.full_name || user.email}
                           </span>
                        </div>
                        <form action="/auth/signout" method="post">
                            <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
                                Sair
                            </button>
                        </form>
                    </div>

                    <LivenessContainer />
                </div>
            )}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
            <LoginScreen />
        </div>
      )}
      
      <AppFooter />
    </main>
  );
}
