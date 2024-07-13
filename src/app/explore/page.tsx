import ContentCard from "@/components/Contents/ContentCard";
import { createClient } from "@/lib/utils/supabase/server";
import { Tables } from "../../../types/supabase";

export default async function Page() {
  const supabase = createClient();
  let files: Tables<"files">;
  const { data, error } = await supabase.from("files").select("*");

  if (error) {
    console.error(error);
    return <div>Error loading files</div>;
  }

  return (
    <main className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((file) => (
        <ContentCard key={file.id} content={file} auth={false} />
      ))}
    </main>
  );
}
