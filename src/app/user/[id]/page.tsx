import Loading from "@/app/Loading";
import ContentCard from "@/components/ContentCard";
import ProfileCard from "@/components/ProfileCard";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Tables } from "../../../../types/supabase";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient();
  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .or(`sub.eq.${params.id},username.eq.${params.id}`)
    .single();

  return {
    title: user.username || user.full_name,
    openGraph: {
      title: user.username || user.full_name,
    },
  };
}

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
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (contentsres) contents = contentsres;

  return (
    <main className="container mx-auto">
      {user && (
        <ProfileCard
          user={user}
          auth={auth}
          viewerID={authUser.data.user?.id}
        />
      )}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {contents &&
          contents.map((content, index) => (
            <ContentCard
              content={content}
              key={index}
              auth={auth}
              user={user as Tables<"profiles">}
            />
          ))}
      </div>
      {!user && !contents && <Loading />}
    </main>
  );
}
