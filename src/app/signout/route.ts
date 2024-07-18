import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

/**
 * Handles the GET request for signing out the user.
 * @param request - The incoming request object.
 * @returns A NextResponse object with the appropriate redirect URL.
 */
export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (!error) return NextResponse.redirect(`${origin}`);
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
