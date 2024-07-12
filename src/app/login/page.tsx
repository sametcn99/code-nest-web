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
    <main className="mx-auto flex flex-col justify-center items-center min-h-screen space-y-4">
      <h1 className="text-3xl font-bold">Code Nest&apos;e Hoş Geldiniz</h1>
      <p className="text-xl">En sevdiğiniz projeleri paylaşın ve keşfedin.</p>
      <form>
        <button
          formAction={signInWithDiscord}
          className="text-xl font-bold inline-flex gap-2 p-2 bg-gray-700 border-gray-900 border-3 rounded-2xl place-items-center hover:scale-99"
        >
          <FaDiscord size={22} />
          Discord ile Giriş Yap
        </button>
      </form>
    </main>
  );
}
