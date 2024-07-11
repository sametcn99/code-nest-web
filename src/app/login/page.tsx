import { createClient } from "@/lib/utils/supabase/server";
import { signInWithDiscord } from "./actions";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/me");
  }
  return (
    <form>
      <button formAction={signInWithDiscord}>Sign In With Discord</button>
    </form>
  );
}
