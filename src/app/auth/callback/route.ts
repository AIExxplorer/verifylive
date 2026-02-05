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

        // NOVA LÓGICA DE REDIRECIONAMENTO BLINDADA
        // Priorizamos a variável de ambiente que VOCÊ controla na Vercel
        let siteUrl = process.env.NEXT_PUBLIC_APP_URL || origin;

        // Garantir que a URL termina sem barra para não duplicar na concatenação
        siteUrl = siteUrl.replace(/\/$/, "");

        // Altere para garantir a barra
        return NextResponse.redirect(`${siteUrl}/${targetPath.replace(/^\//, "")}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
