import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
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
        // Usamos os headers da própria requisição para garantir que o redirecionamento
        // seja para o MESMO domínio que está servindo esta função agora.
        // Isso elimina problemas com Env Vars desatualizadas (NEXT_PUBLIC_APP_URL).
        
        const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
        const protocol = request.headers.get("x-forwarded-proto") || "https";
        
        // Removemos barras finais do host se existirem (raro, mas preventivo)
        const cleanHost = host?.replace(/\/$/, "");
        
        const siteUrl = `${protocol}://${cleanHost}`;

        // Altere para garantir a barra
        return NextResponse.redirect(`${siteUrl}/${targetPath.replace(/^\//, "")}`);
      }
    }
  }

  // Fallback for error case - try to construct a valid URL or use a safe default
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") || "https";
  const cleanHost = host?.replace(/\/$/, "");
  const errorOrigin = cleanHost ? `${protocol}://${cleanHost}` : "https://verifylive.vercel.app";

  return NextResponse.redirect(`${errorOrigin}/auth/auth-code-error`);
}
