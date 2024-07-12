import CodeView from "@/components/CodeView";
import { createClient } from "@/lib/utils/supabase/server";
import { Tables } from "../../../../types/supabase";

export default async function Page({
  params,
}: {
  params: { project: string; id: string };
}) {
  const supabase = createClient();

  let { error, data } = await supabase
    .from("files")
    .select("*")
    .eq("content_id", params.project)
    .single();

  const user = (
    await supabase.from("profiles").select("*").eq("id", data.user_id).single()
  ).data as unknown as Tables<"profiles">;

  if (error) return <div>{error.message}</div>;

  // Adjusted to match the expected prop types of the Editor component
  return (
    <>
      {data && (
        <CodeView
          content={data.content}
          user={user}
          title={data.title}
          description={data.description}
          starCount={data.star_count}
        />
      )}
    </>
  );
}
