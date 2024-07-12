import ProfileCard from "@/components/profile/ProfileCard";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) redirect("/login");

  const userMetadata = data.user?.user_metadata as UserMetadata;
  return <>{userMetadata && <ProfileCard userMetadata={userMetadata} />}</>;
}
