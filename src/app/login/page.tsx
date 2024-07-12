import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { FaDiscord } from "react-icons/fa";
import { signInWithDiscord } from "./actions";

export default async function LoginPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/me");
  }
  return (
    <main className="mx-auto flex min-h-screen flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl font-bold">Code Nest&apos;e Hoş Geldiniz</h1>
      <p className="text-xl">En sevdiğiniz projeleri paylaşın ve keşfedin.</p>
      <form>
        <button
          formAction={signInWithDiscord}
          className="inline-flex place-items-center gap-2 rounded-2xl border-3 border-gray-900 bg-gray-700 p-2 text-xl font-bold hover:scale-99"
        >
          <FaDiscord size={22} />
          Discord ile Giriş Yap
        </button>
      </form>
    </main>
  );
}
