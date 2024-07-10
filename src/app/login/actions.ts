"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/server";

export async function signInWithDiscord(formData: FormData) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: "https://code-nest-web.vercel.app/auth/callback",
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }

  if (error) {
    console.error("Error signing in with Discord:", error.message);
    redirect("/error");
  }
}
