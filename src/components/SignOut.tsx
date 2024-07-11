"use client";
import { createClient } from "@/lib/utils/supabase/client";
import React from "react";

export default function SignOut() {
  const supabase = createClient();

  // Removed the unused 'data' variable
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // Optionally, redirect the user after sign out
    window.location.href = "/login";
  };

  return (
    // Set the button type attribute to "button" to fix the reported issue
    <button type="button" onClick={handleSignOut}>
      Signout
    </button>
  );
}
