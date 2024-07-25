import Loading from "@/app/Loading";
import ContentCard from "@/components/ContentCard";
import ProfileCard from "@/components/ProfileCard";
import { createClient } from "@/utils/server";
import { notFound } from "next/navigation";
import { Tables } from "../../../types/supabase";
import { fetchViews } from "@/utils/utils";
import PaginationControls from "./PaginationControls";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; query?: string };
}) {
  const supabase = createClient();
  const pageSize = 15; // Number of items per page
  const page = parseInt(searchParams.page || "1", 10); // Current page, default to 1
  const query = searchParams.query || ""; // Search query, default to empty string

  let contents: Tables<"files">[] = [];
  const authUser = await supabase.auth.getUser();

  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authUser.data.user?.id)
    .single();

  if (!user) return notFound();

  // Fetch the data for the current page with filtering
  const { data: contentsres, error: contentsError } = await supabase
    .from("files")
    .select("*")
    .eq("user_id", user.id)
    .ilike("title", `%${query}%`) // Filter by title using ilike for case-insensitive search
    .order("created_at", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (contentsres) contents = contentsres;

  // Fetch total count of items for pagination with filtering
  const { count: totalItems } = await supabase
    .from("files")
    .select("id", { count: "exact" })
    .eq("user_id", user.id)
    .ilike("title", `%${query}%`); // Filter by title using ilike for case-insensitive search

  const totalPages = Math.ceil((totalItems || 1) / pageSize);

  const views = await fetchViews(user.id, "profiles");

  return (
    <main className="container mx-auto">
      {user && (
        <ProfileCard user={user} auth={true} viewerID={user.id} views={views} />
      )}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {contents &&
          contents.map((content, index) => (
            <ContentCard
              content={content}
              key={index}
              auth={true}
              user={user as Tables<"profiles">}
            />
          ))}
      </div>
      {!contents.length && <Loading />}
      <PaginationControls totalPages={totalPages} currentPage={page} />
    </main>
  );
}
