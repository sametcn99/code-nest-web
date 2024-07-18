import FeaturesSectionDemo from "@/components/Features";
import { InfiniteMovingCards } from "@/components/InfiniteMovingCards";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { RiFileEditLine } from "react-icons/ri";
import { Tables } from "../../types/supabase";
import Loading from "./Loading";
import { redirect } from "next/dist/server/api-utils";
import { notFound } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data;

  const { data: contents } = await supabase
    .from("files")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(10);

  const userMap: Record<string, Tables<"profiles">> = {};

  if (contents) {
    // Fetch user data for each content
    for (const content of contents) {
      if (!userMap[content.user_id]) {
        const { data: userRes, error: userError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", content.user_id)
          .single();
        if (!userError) {
          userMap[content.user_id] = userRes as Tables<"profiles">;
        }
      }
    }
  }

  return (
    <section className="mt-20 flex w-full flex-col place-items-center gap-40">
      <main className="mx-auto flex w-fit flex-col place-items-center justify-center gap-2">
        <div>
          <h1 className="flex w-full flex-row flex-wrap-reverse items-center justify-center gap-2 text-6xl font-semibold">
            <span>CODENEST</span>
          </h1>
          <p className="my-2 flex w-full items-center justify-center text-2xl text-muted">
            En sevdiğiniz projeleri paylaşın, kaydedin ve keşfedin.
          </p>
        </div>
        <div className="flex h-auto items-center justify-center gap-[0.9375rem] px-[1.5625rem]">
          <Link
            title="Yeni bir proje paylaşın"
            aria-label="Yeni bir proje paylaşın"
            href={"/new"}
            className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-gray-500 px-6 text-gray-200 transition-all duration-200 ease-in-out hover:text-gray-500"
          >
            <RiFileEditLine size={20} /> <span>Paylaşmaya Başlayın</span>
          </Link>
          {!user.user ? (
            <Link
              title="Giriş Yap"
              aria-label="Giriş Yap"
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
          title="Topluluk"
          aria-label="Topluluk"
          href={"/community"}
          className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-gray-500 px-6 text-gray-200 transition-all duration-200 ease-in-out hover:text-gray-500"
        >
          <FaDiscord size={22} />
          <span>Topluluğa katılın</span>
        </Link>
      </main>
      <FeaturesSectionDemo />
      {contents && contents.length > 0 ? (
        <InfiniteMovingCards
          speed={200}
          items={contents as Tables<"files">[]}
          users={userMap}
          title={"Son Paylaşılanlar"}
        />
      ) : (
        <Loading />
      )}
    </section>
  );
}
