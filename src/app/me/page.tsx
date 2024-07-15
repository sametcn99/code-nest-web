import ContentCard from "@/components/Contents/ContentCard";
import ProfileCard from "@/components/profile/ProfileCard";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { Tables } from "../../../types/supabase";

export default async function PrivatePage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) redirect("/login");
  const userMetadata = data.user?.user_metadata as Tables<"profiles">;

  const { data: user, error: contentsError } = await supabase
    .from("profiles")
    .select("*")
    .eq("sub", userMetadata.sub)
    .single();

  const contents = await supabase
    .from("files")
    .select("*")
    .eq("user_id", user.id);

  return (
    <main className="mx-auto w-[60%]">
      {userMetadata && (
        <ProfileCard user={user as Tables<"profiles">} auth={true} />
      )}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {contents.data
          ?.reverse()
          .map((content, index) => (
            <ContentCard content={content} auth={true} key={index} />
          ))}
      </div>
    </main>
  );
}
