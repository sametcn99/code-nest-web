import FeaturesSectionDemo from "@/components/Features";
import { InfiniteMovingCards } from "@/components/InfiniteMovingCards";
import { createClient } from "@/utils/server";
import { Button } from "@nextui-org/react";
import { Tables } from "../../types/supabase";
import Loading from "./Loading";

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
          <p className="my-2 flex w-full items-center justify-center text-center text-2xl text-muted">
            En sevdiğiniz projeleri paylaşın, kaydedin ve keşfedin.
          </p>
        </div>
        <div className="flex h-auto items-center justify-center gap-[0.5rem] px-[1.5625rem]">
          <Button
            title="Yeni bir proje paylaşın"
            aria-label="Yeni bir proje paylaşın"
            color="primary"
            href="/new"
            variant="flat"
          >
            Paylaşmaya Başlayın
          </Button>

          {!user.user ? (
            <Button
              title="Giriş Yap"
              aria-label="Giriş Yap"
              color="success"
              href="/login"
              variant="flat"
            >
              Giriş Yap
            </Button>
          ) : (
            <></>
          )}
        </div>
        <Button
          title="Topluluk"
          aria-label="Topluluk"
          color="secondary"
          href="/community"
          variant="flat"
        >
          Topluluğumuza Katılın
        </Button>
      </main>
      <FeaturesSectionDemo />
      {contents && contents.length > 0 ? (
        <InfiniteMovingCards
          speed={80}
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
