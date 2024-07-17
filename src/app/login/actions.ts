"use server";
import { createClient } from "@/lib/utils/supabase/server";
import { notFound, redirect } from "next/navigation";

export async function signInWithDiscord() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });

  if (data.url) {
    // Send a webhook message to GitHub upon successful login
    try {
      await fetch("https://discord.com/api/webhooks/1263082335188815952/O9lu2g0jnoOHO4fbIpfvOhwUV9YbU1SRneyzvQjiDl3wnbj5V1omqOF3iOSzayZfs5Z8", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: `User successfully signed in with Discord.`,
        }),
      });
    } catch (webhookError) {
      console.error("Error sending webhook message to GitHub:", webhookError.message);
    }
    
    redirect(data.url); // use the redirect API for your server framework
  }

  if (error) {
    console.error("Error signing in with Discord:", error.message);
    notFound();
  }
}
