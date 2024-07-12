import ProfileCard from "@/components/profile/ProfileCard";
import { createClient } from "@/lib/utils/supabase/server";
import { Database } from "../../../../types/supabase";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const user: Database["public"]["Tables"]["profiles"]["Row"] = (await supabase
    .from("users")
    .select("*")
    .eq("sub", params.id)
    .single()
    .then(
      ({ data }) => data,
    )) as Database["public"]["Tables"]["profiles"]["Row"];

  if (!user) return <div>User not found</div>;
  return <ProfileCard userMetadata={user} />;
}