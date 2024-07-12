import ContentCard from "@/components/Contents/ContentCard";
import ProfileCard from "@/components/profile/ProfileCard";
import { createClient } from "@/lib/utils/supabase/server";
import { Tables } from "../../../../types/supabase";

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
      <div className="mt-4 grid grid-cols-3 gap-4">
        {contents.map((content, index) => (
          <ContentCard content={content} key={index} />
        ))}
      </div>
    </main>
  );
}
