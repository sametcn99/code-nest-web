"use client";
import { useState, useEffect } from "react";
import ContentCard from "@/components/ContentCard";
import { createClient } from "@/utils/server";
import { Tables } from "../../../types/supabase";
import Loading from "../Loading";

export default function Page() {
  const [contents, setContents] = useState<Tables<"files">[]>([]);
  const [filteredContents, setFilteredContents] = useState<Tables<"files">[]>([]);
  const [userMap, setUserMap] = useState<Record<string, Tables<"profiles">>>({});
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("files")
        .select("created_at, title, description, id, user_id, content_id")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading files:", error);
        return;
      }

      const fetchedContents = data as Tables<"files">[];
      setContents(fetchedContents);
      setFilteredContents(fetchedContents);

      const userMap: Record<string, Tables<"profiles">> = {};
      for (const content of fetchedContents) {
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
      setUserMap(userMap);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = contents.filter(content =>
      content.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContents(filtered);
  }, [searchTerm, contents]);

  return (
    <section className="mx-auto flex flex-col place-items-center gap-5">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Keşfet</h1>
        <h2 className="text-2xl font-bold">
          Topluluğumuz tarafından paylaşılan içerikleri keşfedin!
        </h2>
        <input
          type="text"
          placeholder="Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-4 w-full max-w-md p-2 border rounded-lg"
        />
      </div>
      <main className="container grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredContents.length > 0 ? (
          filteredContents.map((file) => (
            <ContentCard
              key={file.id}
              content={file as Tables<"files">}
              user={userMap[file.user_id] as Tables<"profiles">}
              auth={false}
            />
          ))
        ) : (
          <Loading />
        )}
      </main>
    </section>
  );
}
