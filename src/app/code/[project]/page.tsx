import CodeView from "@/components/CodeView";
import { createClient } from "@/lib/utils/supabase/server";
import { notFound } from "next/navigation";
import { Tables } from "../../../../types/supabase";
import RandomContents from "@/components/ui/RandomContents";

export default async function Page({
  params,
}: {
  params: { project: string; id: string };
}) {
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
      <RandomContents />
    </main>
  );
}
