import ContentCard from "@/components/Contents/ContentCard";
import { createClient } from "@/lib/utils/supabase/server";
import { Tables } from "../../../types/supabase";

export default async function Page() {
  const supabase = createClient();
  let files: Tables<"files">;
  const { data, error } = await supabase
    .from("files")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <div>Error loading files</div>;
  }

  return (
    <section className="mx-auto flex flex-col place-items-center gap-5">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Keşfet</h1>
        <h2 className="text-2xl font-bold">
          Topluluğumuz tarafından paylaşılan içerikleri keşfedin!
        </h2>
      </div>
      <main className="container grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((file) => (
          <ContentCard key={file.id} content={file} auth={false} />
        ))}
      </main>
    </section>
  );
}
