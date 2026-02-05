import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard"; // Default to dashboard if no next param

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Get user to check verification status
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Check verification status in profile
        const { data: profile } = await supabase
          .from("verifylive_profiles")
          .select("is_verified")
          .eq("id", user.id)
          .single();

        const isVerified = profile?.is_verified ?? false;
        
        // Fallback Logic: 
        // If query failed (profile is null) OR is_verified is false -> Force /compliance.
        // Only if strictly verified -> Go to next (dashboard).
        const targetPath = (profile && isVerified) ? next : "/compliance"; 

        // Determine redirect origin using same logic as getURL for consistency if needed, 
        // or rely on request origin if valid.
        const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
        const isLocalEnv = process.env.NODE_ENV === "development";
        
        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${targetPath}`);
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${targetPath}`);
        } else {
          return NextResponse.redirect(`${origin}${targetPath}`);
        }
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
