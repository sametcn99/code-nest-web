import CodeView from "@/components/CodeView";
import { createClient } from "@/lib/utils/supabase/server";
import { Tables } from "../../../../types/supabase";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { project: string; id: string };
}) {
  const supabase = createClient();

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
      avatar_url: "",
      full_name: "unknown",
      username: "unknown",
      email: "unknown@unknown.com",
      followers: null,
      followers_count: null,
      followings: null,
      sub: "",
      website: null,
    };
  }

  // Adjusted to match the expected prop types of the Editor component
  return (
    <>
      {data && user && (
        <CodeView content={data} user={user} isUserDeleted={isUserDeleted} />
      )}
    </>
  );
}
