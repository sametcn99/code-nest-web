import { createClient } from "@/lib/utils/supabase/server";
import { MetadataRoute } from "next";
import { Tables } from "../../types/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();
  let contents: Tables<"files">[] = [];
  let users: Tables<"profiles">[] = [];
  const { data, error } = await supabase
    .from("profiles")
    .select("full_name, username");
  users = data as Tables<"profiles">[];

  if (error) {
    console.error(error);
    return [];
  }

  const { data: files, error: filesError } = await supabase
    .from("files")
    .select("content_id")
    .order("created_at", { ascending: false });
  contents = files as Tables<"files">[];

  if (error || filesError) {
    console.error(error || filesError);
    return [];
  }

  return [
    {
      url: "https://code-nest-web.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://code-nest-web.vercel.app/explore",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://code-nest-web.vercel.app/community",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://code-nest-web.vercel.app/topluluk",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://code-nest-web.vercel.app/destek",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://code-nest-web.vercel.app/discord",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...users.map((user: Tables<"profiles">) => ({
      url: `https://code-nest-web.vercel.app/${user.username || user.full_name}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    })),
    ...contents.map((content: Tables<"files">) => ({
      url: `https://code-nest-web.vercel.app/code/${content.content_id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    })),
  ];
}
