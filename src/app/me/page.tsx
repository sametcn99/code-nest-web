import Loading from "@/app/Loading";
import ContentCard from "@/components/ContentCard";
import ProfileCard from "@/components/ProfileCard";
import { createClient } from "@/utils/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Tables } from "../../../types/supabase";

export default async function Page() {
  const supabase = createClient();
  let contents: Tables<"files">[] = [];
  const authUser = await supabase.auth.getUser();

  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .or(
      `sub.eq.${authUser.data.user?.user_metadata.sub},username.eq.${authUser.data.user?.user_metadata.sub}`,
    )
    .single();

  if (!user) return notFound();

  const { data: contentsres } = await supabase
    .from("files")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (contentsres) contents = contentsres;

  return (
    <main className="container mx-auto">
      {user && (
        <ProfileCard
          user={user}
          auth={true}
          viewerID={authUser.data.user?.id}
        />
      )}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {contents &&
          contents.map((content, index) => (
            <ContentCard
              content={content}
              key={index}
              auth={true}
              user={user as Tables<"profiles">}
            />
          ))}
      </div>
      {!user && !contents && <Loading />}
    </main>
  );
}
