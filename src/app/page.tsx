import { createClient } from "@/lib/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data;

  return (
    <main className="mx-auto flex w-fit flex-col place-items-center justify-center gap-2">
      <div>
        <h1 className="flex w-full flex-row flex-wrap-reverse items-center justify-center gap-2 text-6xl font-semibold">
          CODENEST
          <Image
            src="/icons/favicon.ico"
            width={45}
            height={45}
            alt="logo"
            className="hover:-rotate-45 hover:scale-110 tranisition-all duration-700 ease-in-out select-none"
          />
        </h1>
        <p className="my-2 flex w-full items-center justify-center text-2xl text-muted">
          Projeleri Keşfet, Paylaş ve İş Birliği Yap
        </p>
      </div>
      <div className="flex h-auto items-center justify-center gap-[0.9375rem] px-[1.5625rem]">
        <Link
          href={"/new"}
          className="flex h-10 cursor-pointer items-center justify-center rounded-2xl border border-gray-500 px-6 text-gray-200 transition-all duration-200 ease-in-out hover:text-gray-500"
        >
          Başlayın
        </Link>
        {!user.user ? (
          <Link
            href={"/login"}
            className="flex h-10 cursor-pointer items-center justify-center rounded-2xl border border-gray-500 px-6 text-gray-200 transition-all duration-200 ease-in-out hover:text-gray-500"
          >
            Giriş Yap
          </Link>
        ) : (
          <></>
        )}
      </div>
      <Link
        href={"https://discord.gg/PtP372mA"}
        className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-gray-500 px-6 text-gray-200 transition-all duration-200 ease-in-out hover:text-gray-500"
      >
        <FaDiscord size={22} />
        <span>Topluluğa katılın</span>
      </Link>
    </main>
  );
}
