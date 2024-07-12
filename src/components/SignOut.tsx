import { createClient } from "@/lib/utils/supabase/client";

export default function SignOut() {
  const supabase = createClient();

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
