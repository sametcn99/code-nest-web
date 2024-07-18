import ContentCard from "@/components/ContentCard";
import { createClient } from "@/utils/supabase/server";
import { Tables } from "../../../types/supabase";
import Loading from "../Loading";

export default async function Page() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("files")
    .select("created_at, title, description, id, user_id, content_id")
    .order("created_at", { ascending: false });

  if (error) {
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
      <main className="container grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data &&
          data.map((file) => (
            <ContentCard
              key={file.id}
              content={file as Tables<"files">}
              auth={false}
            />
          ))}
        {!data && <Loading />}
      </main>
    </section>
  );
}
