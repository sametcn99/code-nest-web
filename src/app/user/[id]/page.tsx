import Loading from "@/app/Loading";
import ContentCard from "@/components/ContentCard";
import ProfileCard from "@/components/ProfileCard";
import { createClient } from "@/utils/server";
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
    .or(`id.eq.${params.id},username.eq.${params.id}`)
    .single();

  return {
    title: user.username || user.full_name,
    description: user.bio || "User profile description",
    icons: {
      icon: user.avatar_url || "/icons/favicon-512x512.png",
      shortcut: user.avatar_url || "/icons/favicon-512x512.png",
      apple: user.avatar_url || "/icons/favicon-512x512.png",
      username: user.username || user.full_name,
    },
    openGraph: {
      title: user.username || user.full_name,
      description: user.bio || "User profile description",
      images: [user.avatar_url || "/icons/favicon-512x512.png"],
      type: "profile",
    },
    twitter: {
      title: user.username || user.full_name,
      description: user.bio || "User profile description",
      images: [user.avatar_url || "/icons/favicon-512x512.png"],
      creator: user.username,
      creatorId: `@${user.username}`,
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient();
  let contents: Tables<"files">[] = [];

  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .or(`id.eq.${params.id},username.eq.${params.id}`)
    .single();

  if (!user) return notFound();
  const authUser = await supabase.auth.getUser();

  const { data: contentsres } = await supabase
    .from("files")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (contentsres) contents = contentsres;

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/update-views?id=${user.id}&table=profiles`, {
    method: "POST",
  });

  return (
    <main className="container mx-auto">
      {user && (
        <ProfileCard
          user={user}
          auth={false}
          viewerID={authUser.data.user?.id}
        />
      )}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {contents &&
          contents.map((content, index) => (
            <ContentCard
              content={content}
              key={index}
              auth={false}
              user={user as Tables<"profiles">}
            />
          ))}
      </div>
      {!user && !contents && <Loading />}
    </main>
  );
}
