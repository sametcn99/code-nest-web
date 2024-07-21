import { createClient } from "@/utils/server";
import { MetadataRoute } from "next";
import { Tables } from "../../types/supabase";

/**
 * Generates a sitemap for the Code Nest Web application.
 * @returns A promise that resolves to an array of sitemap routes.
 */
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
    .select("id")
    .order("created_at", { ascending: false });
  contents = files as Tables<"files">[];

  if (error || filesError) {
    console.error(error || filesError);
    return [];
  }

  const base = "https://codenest.app";

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/explore`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: `${base}/users`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: `${base}/community`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: `${base}/topluluk`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: `${base}/destek`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: `${base}/discord`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    ...users.map((user: Tables<"profiles">) => ({
      url: `${base}/user/${user.id}`,
      lastModified: new Date(),
      changeFrequency: "never" as const,
      priority: 1,
    })),
    ...contents.map((content: Tables<"files">) => ({
      url: `${base}/code/${content.id}`,
      lastModified: new Date(),
      changeFrequency: "never" as const,
      priority: 1,
    })),
  ];
}
