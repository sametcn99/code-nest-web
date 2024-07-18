import { createClient } from "@/utils/supabase/client";

/**
 * Renders a sign out button and handles the sign out functionality.
 */
export default function SignOut() {
  const supabase = createClient();

  /**
   * Handles the sign out process.
   */
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <button type="button" onClick={handleSignOut} className="text-xl">
      Çıkış Yap
    </button>
  );
}
