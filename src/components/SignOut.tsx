import { redirect } from "next/navigation";

/**
 * Renders a sign out button and handles the sign out functionality.
 */
export default function SignOut() {
  /**
   * Handles the sign out process.
   */
  function handleSignOut() {
    redirect("/auth/signout");
  }

  return (
    <button type="button" onClick={handleSignOut} className="text-xl">
      Çıkış Yap
    </button>
  );
}
