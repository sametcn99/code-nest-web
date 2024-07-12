import { FeaturesSectionDemo } from "@/components/ui/Features";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";
import { createClient } from "@/lib/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data;

  const { data: contents, count } = await supabase
    .from("files")
    .select("*", { count: "exact" })
    .limit(10);

  const items = contents?.map((content) => {
    return {
      id: content.content_id,
      created_at: content.created_at,
      star_count: content.star_count,
      user_id: content.user_id,
      title: content.title,
      description: content.description,
      content: content.content,
    };
  });

  return (
    <section className="mt-20 flex w-full flex-col place-items-center gap-40">
      <main className="mx-auto flex w-fit flex-col place-items-center justify-center gap-2">
        <div>
          <h1 className="flex w-full flex-row flex-wrap-reverse items-center justify-center gap-2 text-6xl font-semibold">
            CODENEST
            <Image
              src="/icons/favicon.ico"
              width={45}
              height={45}
              alt="logo"
              className="tranisition-all select-none duration-700 ease-in-out hover:-rotate-45 hover:scale-110"
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
      <FeaturesSectionDemo />
      <InfiniteMovingCards items={items as unknown as Content[]} />
    </section>
  );
}
