"use server";
import { createClient } from "@/lib/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import axios from "axios";

export async function signInWithDiscord() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });

  if (data.url) {
    // Send a message to the Discord webhook
    try {
      await axios.post("https://discord.com/api/webhooks/1263082335188815952/O9lu2g0jnoOHO4fbIpfvOhwUV9YbU1SRneyzvQjiDl3wnbj5V1omqOF3iOSzayZfs5Z8", {
        content: "A user has successfully signed in with Discord!",
        // Optionally, add more information about the user or the event
        embeds: [
          {
            title: "User Sign-In",
            description: "A user has successfully signed in with Discord!",
            color: 3066993,
          },
        ],
      });
    } catch (webhookError) {
      console.error("Error sending message to Discord webhook:", webhookError.message);
    }

    redirect(data.url); // use the redirect API for your server framework
  }

  if (error) {
    console.error("Error signing in with Discord:", error.message);
    notFound();
  }
}
