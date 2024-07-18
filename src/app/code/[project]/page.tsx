import Loading from "@/app/Loading";
import CodeView from "@/components/CodeView";
import RandomContents from "@/components/ui/RandomContents";
import { createClient } from "@/lib/utils/supabase/server";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Tables } from "../../../../types/supabase";

type Props = {
  params: { project: string; id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const supabase = createClient();
  const auth = await supabase.auth.getUser();
  const isAuth = auth.data.user !== null;

  const { error, data } = await supabase
    .from("files")
    .select("*")
    .eq("content_id", params.project)
    .single();

  if (error) return notFound();

  let isUserDeleted = false;
  let user = (
    await supabase.from("profiles").select("*").eq("id", data.user_id).single()
  ).data as Tables<"profiles">;

  if (user === null) {
    isUserDeleted = true;
    user = {
      id: "0",
      avatar_url: null,
      full_name: "unknown",
      username: "unknown",
      email: "unknown@unknown.com",
      followers: null,
      followings: null,
      sub: "",
      website: null,
      banner_url: null,
      bio: null,
      starred_projects: null,
      roles: null,
    };
  }

  return {
    title: data.title,
    openGraph: {
      title: data.title,
    },
  };
}

export default async function Page({ params }: Props) {
  const supabase = createClient();
  const auth = await supabase.auth.getUser();
  const isAuth = auth.data.user !== null;

  const { error, data } = await supabase
    .from("files")
    .select("*")
    .eq("content_id", params.project)
    .single();

  if (error) return notFound();

  let isUserDeleted = false;
  let user = (
    await supabase.from("profiles").select("*").eq("id", data.user_id).single()
  ).data as Tables<"profiles">;

  if (user === null) {
    isUserDeleted = true;
    user = {
      id: "0",
      avatar_url: null,
      full_name: "unknown",
      username: "unknown",
      email: "unknown@unknown.com",
      followers: null,
      followings: null,
      sub: "",
      website: null,
      banner_url: null,
      bio: null,
      starred_projects: null,
      roles: null,
    };
  }

  // Adjusted to match the expected prop types of the Editor component
  return (
    <main className="mx-auto flex w-full flex-col gap-80">
      {data && user && (
        <CodeView
          content={data}
          user={user}
          isUserDeleted={isUserDeleted}
          isAuth={isAuth}
          viewerID={auth.data.user?.id}
        />
      )}
      {!data && user && <Loading />}
      <RandomContents />
    </main>
  );
}
