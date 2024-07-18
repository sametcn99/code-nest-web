import ProfileCard from "@/components/ProfileCard";
import { createClient } from "@/utils/supabase/server";
import { FaCrown } from "react-icons/fa6";
import { Tables } from "../../../types/supabase";

export default async function Page() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .not("roles", "is", null);
  if (error) return <div>Veriler yüklenirken bir hata oluştu.</div>;
  const users = data as Tables<"profiles">[];

  return (
    <div className="container mx-auto flex w-full flex-col items-center justify-center gap-4 p-4">
      <div>
        <h2 className="mb-2 ml-auto mr-auto text-center text-3xl font-bold">
          Geliştiriciler
        </h2>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {users && users.length > 0 ? (
          users.map((user, index) => (
            <ProfileCard user={user} auth={false} key={index} className="" />
          ))
        ) : (
          <FaCrown />
        )}
      </div>
    </div>
  );
}
