"use server";

import { createClient, createAdminClient } from "../../lib/supabase/server";

export async function uploadDocument(formData: FormData) {
  const file = formData.get("file") as File;
  const docType = formData.get("type") as string; // 'FRONT', 'BACK', 'PDF'
  
  if (!file || !docType) {
    throw new Error("Missing file or document type.");
  }

  // 1. Try to get authenticatd user first
  const authClient = await createClient();
  const { data: { user } } = await authClient.auth.getUser();

  let supabase;
  let userId = user?.id;

  // 2. Setup Client (Admin if anon, Standard if auth)
  if (user) {
    supabase = authClient;
  } else {
    console.warn("Upload: No user found, using Admin Client for anonymous upload.");
    const admin = await createAdminClient();
    if (!admin) throw new Error("Configuration Error: No Admin Client available for anon upload.");
    supabase = admin;
    userId = `anon_${Date.now()}`; // Temporary ID for session
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${docType}_${Date.now()}.${fileExt}`;

  // Upload to 'verifylive-docs'
  // Note: If using Admin Client, RLS is bypassed.
  const { error } = await supabase.storage
    .from("verifylive-docs")
    .upload(fileName, file, {
      upsert: true,
      contentType: file.type
    });

  if (error) {
    console.error("Upload failed:", error);
    throw new Error("Failed to upload document: " + error.message);
  }

  return { success: true, path: fileName };
}
