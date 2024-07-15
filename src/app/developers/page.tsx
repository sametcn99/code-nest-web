import { createClient } from "@/lib/utils/supabase/server";
import React from "react";
import { FaCrown } from "react-icons/fa6";
import { Tables } from "../../../types/supabase";
import ProfileCard from "@/components/profile/ProfileCard";

export default async function Page() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .not("roles", "is", null);

  if (error) {
    return <div>Veriler yüklenirken bir hata oluştu.</div>;
  }

  const users = data as Tables<"profiles">[];

  return (
    <div className="container mx-auto flex w-full flex-col items-center justify-center gap-4 p-4">
      <div>
        <h2 className="mb-2 ml-auto mr-auto text-center text-3xl font-bold">
          Geliştiriciler
        </h2>
        <p className="text-muted">
          Bu sayfada yer alan geliştiriciler, projelerimize katkıda bulunan ve
          topluluğumuzu güçlendiren kişilerdir.
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {users && users.length > 0 ? (
          users.map((user, index) => (
            <ProfileCard user={user} auth={false} key={index} />
          ))
        ) : (
          <FaCrown />
        )}
      </div>
    </div>
  );
}
