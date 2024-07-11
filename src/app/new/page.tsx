import Editor from "@/components/editor/Editor";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return <Editor />;
}
