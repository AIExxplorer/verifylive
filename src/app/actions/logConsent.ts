"use server";

import { createClient, createAdminClient } from "../../lib/supabase/server";
import { headers } from "next/headers";

export async function logConsent() {
  // Use Admin Client to ensure we can write to audit logs regardless of RLS
  // (e.g., for anonymous users or strict insert policies)
  let supabase;
  try {
     const adminClient = await createAdminClient();
     if (adminClient) {
       supabase = adminClient;
     } else {
       console.warn("Falling back to anon client (Service Role missing)");
       supabase = await createClient();
     }
  } catch (e) {
     console.warn("Service Role Key missing, falling back to anon client", e);
     supabase = await createClient();
  }

  const headerStore = await headers();
  const authClient = await createClient(); // Need auth context to check user

  // 1. Get User (Optional now)
  const { data: { user } } = await authClient.auth.getUser();
  
  // 2. Extract Metadata (IP, UA)
  const ip = headerStore.get("x-forwarded-for") || "unknown";
  const userAgent = headerStore.get("user-agent") || "unknown";

  // 3. Insert Audit Log
  const { error } = await supabase
    .from("verifylive_audit_logs")
    .insert({
      user_id: user?.id || null, // Allow anonymous logging
      action: "CONSENT_ACCEPTED",
      status: "AGREED",
      confidence: 1.0, 
      ip_address: ip,
      user_agent: userAgent,
      metadata: {
        consent_version: "v1.0",
        timestamp: new Date().toISOString(),
        legal_basis: "LGPD_CONSENT_BIOMETRIC",
        authenticated: !!user
      }
    });

  if (error) {
    console.error("Failed to log consent:", error);
    // We shouldn't block the UI if the LOGGING fails (fail open vs fail closed?)
    // For high compliance, we should throw. For dev/hackathon, log and proceed?
    // Let's throw to be safe.
    throw new Error("Failed to persist consent log: " + error.message);
  }

  return { success: true };
}
