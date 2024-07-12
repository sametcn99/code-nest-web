import { createClient } from "@/lib/utils/supabase/server";
import Link from "next/link";
import UserButton from "./UserButton";
import { FloatingNavbar } from "./ui/FloatingNavbar";

export default async function Navbar() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <FloatingNavbar
      navItems={navItems}
      username={data.user?.user_metadata.full_name}
    />
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
