import ProfileCard from "@/components/profile/ProfileCard";
import { createClient } from "@/lib/utils/supabase/server";
import { Input } from "@nextui-org/input";
import { Tables } from "../../../types/supabase";

export default async function Page() {
  const supabase = createClient();
  const { data, error } = await supabase.from("profiles").select("*");
  if (error) {
    return <div>Veriler yüklenirken bir hata oluştu.</div>;
  }
  const users = data as Tables<"profiles">[];

  return (
    <div className="container mx-auto flex w-full flex-col items-center justify-center gap-4 p-4">
      <h2 className="mb-2 ml-auto mr-auto text-center text-3xl font-bold">
        Kullanıcılar
      </h2>
      <p className="text-muted">
        Bu sayfada yer alan Kullanıcılar, projelerimize katkıda bulunan ve
        topluluğumuzu güçlendiren kişilerdir.
      </p>
      <Input placeholder="Ara..." className="mt-4 max-w-96" />
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {users &&
          users.length > 0 &&
          users.map((user, index) => (
            <ProfileCard user={user} auth={false} key={index} />
          ))}
      </div>
    </div>
  );
}
