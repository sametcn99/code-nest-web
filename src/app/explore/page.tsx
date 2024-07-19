"tsx"import ContentCard from "@/components/ContentCard";
import { createClient } from "@/utils/server";
import { Tables } from "../../../types/supabase";
import Loading from "../Loading";

export default async function Page() {
  const supabase = createClient();
  let contents: Tables<"files">[] = [];
  const { data, error } = await supabase
    .from("files")
    .select("created_at, title, description, id, user_id, content_id")
    .order("created_at", { ascending: false });
  if (error) return <div>Error loading files</div>;
  contents = data as Tables<"files">[];

  const userMap: Record<string, Tables<"profiles">> = {};
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
      {/* ... (Heading and subheading) ... */}
      <input 
        type="text" 
        placeholder="Search..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded-md w-full md:w-1/2" 
      />
      <main className="container grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filterContents().map((file) => ( // Filter and then map
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
