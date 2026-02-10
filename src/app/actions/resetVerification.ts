"use server";

import { createClient, createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function resetVerification() {
  const supabase = (await createAdminClient()) || (await createClient());
  const authClient = await createClient();

  // 1. Get User
  const { data: { user } } = await authClient.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // 2. Fetch current profile state (for logging purposes)
  const { data: profile } = await supabase
    .from("verifylive_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // 3. Log archival action
  if (profile) {
      await supabase.from("verifylive_audit_logs").insert({
        user_id: user.id,
        action: "VERIFICATION_RESET",
        status: "ARCHIVED",
        metadata: {
            previous_sate: profile,
            reason: "User requested renewal"
        },
        ip_address: "unknown"
      });
  }

  // 4. Update Profile (Reset Verification)
  const { error } = await supabase
    .from("verifylive_profiles")
    .update({
        is_verified: false,
        verified_at: null,
        updated_at: new Date().toISOString()
    })
    .eq("id", user.id);

  if (error) {
    console.error("Failed to reset verification:", error);
    throw new Error("Failed to reset verification");
  }

  // 5. Revalidate and Redirect
  revalidatePath("/dashboard");
  revalidatePath("/compliance");
  
  // We can redirect or just let the client refresh
  return { success: true };
}
