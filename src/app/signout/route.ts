import { createClient } from "@/lib/utils/supabase/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  // if "next" is in param, use it as the redirect URL
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (!error) {
    return NextResponse.redirect(`${origin}`);
  }
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
