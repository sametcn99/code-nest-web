import ContentCard from "@/components/ContentCard";
import { createClient } from "@/utils/supabase/server";
import { Tables } from "../../../types/supabase";
import Loading from "../Loading";

export default async function Page() {
  const supabase = createClient();
  let contents: Tables<"files">[] = [];
  const { data, error } = await supabase
    .from("files")
    .select("created_at, title, description, id, user_id, content_id")
    .order("created_at", { ascending: false });

  contents = data as Tables<"files">[];

  if (error) {
    return <div>Error loading files</div>;
  }

  const userMap: Record<string, Tables<"profiles">> = {};

  // Fetch user data for each content
  for (const content of contents) {
    if (!userMap[content.user_id]) {
      const { data: userRes, error: userError } = await supabase
        .from("profiles")
        .select("avatar_url, id, username, full_name")
        .eq("id", content.user_id)
        .single();
      if (!userError) {
        userMap[content.user_id] = userRes as Tables<"profiles">;
      }
    }
  }

  return (
    <section className="mx-auto flex flex-col place-items-center gap-5">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Keşfet</h1>
        <h2 className="text-2xl font-bold">
          Topluluğumuz tarafından paylaşılan içerikleri keşfedin!
        </h2>
      </div>
      <main className="container grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {contents &&
          contents.map((file) => (
            <ContentCard
              key={file.id}
              content={file as Tables<"files">}
              user={userMap[file.user_id] as Tables<"profiles">}
              auth={false}
            />
          ))}
        {!contents && <Loading />}
      </main>
    </section>
  );
}
