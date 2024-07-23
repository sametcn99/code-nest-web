import { createClient } from "@/utils/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { origin } = new URL(request.url);
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw Error("Sign out failed");
    }

    return NextResponse.redirect(`${origin}/`);
  } catch (error) {
    console.error("Error during sign out:", error);
    // Optionally, redirect to an error page or return a custom error response
    return new Response("Error processing your request", { status: 500 });
  }
}
