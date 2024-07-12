import { createClient } from "@/lib/utils/supabase/server";
import Link from "next/link";
import UserButton from "./UserButton";
import { FloatingNavbar } from "./ui/FloatingNavbar";

export default async function Navbar() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <>
      <div className="flex w-[75%] flex-row justify-between p-2">
        <div className="inline-flex gap-2">
          <Link href={"/"} className="nav-item">
            Ana Sayfa
          </Link>
          <Link href={"/explore"} className="nav-item">
            Keşfet
          </Link>
        </div>
        <div className="inline-flex gap-2">
          <UserButton
            avatar_url={data?.user?.user_metadata.avatar_url}
            username={data.user?.user_metadata.full_name}
          />
        </div>
      </div>
      <FloatingNavbar
        navItems={navItems}
        username={data.user?.user_metadata.full_name}
      />
    </>
  );
}

const navItems = [
  {
    name: "Anasayfa",
    link: "/",
  },
  {
    name: "Keşfet",
    link: "/explore",
  },
  {
    name: "Topluluk",
    link: "https://discord.gg/PtP372mA",
  },
];
