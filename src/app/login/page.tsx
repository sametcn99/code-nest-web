import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { FaDiscord } from "react-icons/fa";
import { signInWithDiscord } from "./actions";
import Link from "next/link";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import Image from "next/image";

export default async function LoginPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/me");
  }
  return (
    <main className="mx-auto flex flex-col items-center justify-center space-y-4">
      <Card className="max-w-[28rem] bg-transparent p-4 backdrop-blur-sm border-b-1">
        <CardHeader className="flex flex-col place-items-center justify-center gap-4 text-center text-3xl font-bold">
          <Image
            src="/icons/favicon-512x512.png"
            width={100}
            height={100}
            alt="Logo"
            className="pointer-events-none select-none"
          />
          <span>Code Nest&apos;e Hoş Geldiniz</span>
        </CardHeader>
        <CardBody className="flex flex-col place-items-center">
          <p className="text-center text-xl">
            En sevdiğiniz projeleri paylaşın, kaydedin ve keşfedin.
          </p>
          <Divider className="mb-6 mt-12" />
          <form>
            <button
              formAction={signInWithDiscord}
              className="inline-flex place-items-center gap-2 rounded-2xl border-b-3 border-gray-800 bg-transparent p-2 text-xl font-bold backdrop-blur-sm transition-all duration-200 hover:scale-99 hover:border-b-2"
            >
              <FaDiscord size={22} />
              Discord ile Giriş Yapın
            </button>
          </form>
        </CardBody>
        <CardFooter className="text-sm text-muted">
          <p>
            Kullanıcı bilgilerinizi{" "}
            <Link
              href={"https://supabase.com/auth"}
              target="_blank"
              className="text-green-700 hover:underline"
            >
              Supabase Auth
            </Link>{" "}
            kullanarak koruyoruz.
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
