import ProfileCard from "@/components/profile/ProfileCard";
import { createClient } from "@/lib/utils/supabase/server";
import { Database, Tables } from "../../../../types/supabase";
import ContentCard from "@/components/Contents/ContentCard";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient();
  let contents: Tables<"files">[] = [];
  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .eq("sub", params.id)
    .single();

  const { data: contentsres } = await supabase
    .from("files")
    .select("*")
    .eq("user_id", user.id);

  if (contentsres) {
    contents = contentsres;
  }

  if (!user) return <div>User not found</div>;
  return (
    <main className="mx-auto w-[60%]">
      <ProfileCard userMetadata={user} />
      <div className="grid grid-cols-3 gap-4 mt-4">
      {contents.map((content, index) => (
        <ContentCard content={content} key={index} />
      ))}
      </div>
    </main>
  );
}
