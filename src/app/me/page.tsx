import ProfileCard from "@/components/profile/ProfileCard";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { Tables } from "../../../types/supabase";

export default async function PrivatePage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) redirect("/login");

  const userMetadata = data.user?.user_metadata as Tables<"profiles">;
  return <>{userMetadata && <ProfileCard userMetadata={userMetadata} />}</>;
}
