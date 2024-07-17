import ContentCard from "@/components/Contents/ContentCard";
import ProfileCard from "@/components/profile/ProfileCard";
import { createClient } from "@/lib/utils/supabase/server";
import { notFound } from "next/navigation";
import { Tables } from "../../../../types/supabase";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient();
  let contents: Tables<"files">[] = [];

  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .or(`sub.eq.${params.id},username.eq.${params.id}`)
    .single();

  if (!user) return notFound();
  const authUser = await supabase.auth.getUser();
  const auth: boolean =
    authUser && authUser.data.user?.user_metadata.sub === user.sub;

  const { data: contentsres } = await supabase
    .from("files")
    .select("*")
    .eq("user_id", user.id).order("created_at", { ascending: false });

  if (contentsres) {
    contents = contentsres;
  }

  return (
    <main className="mx-auto w-[60%]">
      <ProfileCard user={user} auth={auth} viewerID={authUser.data.user?.id} />
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {contents.map((content, index) => (
          <ContentCard content={content} key={index} auth={auth} />
        ))}
      </div>
    </main>
  );
}
