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
    .eq("sub", params.id)
    .single();

  if (!user) return notFound();

  const { data: contentsres } = await supabase
    .from("files")
    .select("*")
    .eq("user_id", user.id);

  if (contentsres) {
    contents = contentsres;
  }

  return (
    <main className="mx-auto w-[60%]">
      <ProfileCard user={user} auth={false} />
      <div className="mt-4 grid grid-cols-3 gap-4">
        {contents.map((content, index) => (
          <ContentCard content={content} key={index} auth={false} />
        ))}
      </div>
    </main>
  );
}
