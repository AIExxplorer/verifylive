import { createClient } from "@/lib/supabase/server";
import { VerifiedDashboard } from "@/components/verification/VerifiedDashboard";
import { redirect } from "next/navigation";
import { LivenessContainer } from "@/components/liveness/LivenessContainer";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("verifylive_profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  // If verified, show dashboard
  if (profile?.is_verified) {
      // Fetch last archived date
      const { data: logs } = await supabase
        .from("verifylive_audit_logs")
        .select("created_at")
        .eq("user_id", user.id)
        .eq("action", "VERIFICATION_RESET")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      
      const archivedAt = logs?.created_at || null;

      return <VerifiedDashboard user={user} profile={profile} archivedAt={archivedAt} />;
  }

  // Not verified (or renewed), show Verification Flow
  return <LivenessContainer />;
}
