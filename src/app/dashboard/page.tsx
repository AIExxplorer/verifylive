import { createClient } from "@/lib/supabase/server";
import { VerifiedDashboard } from "@/components/verification/VerifiedDashboard";
import { redirect } from "next/navigation";

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
    .single();

  return <VerifiedDashboard user={user} profile={profile} />;
}
