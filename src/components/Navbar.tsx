import { createClient } from "@/utils/supabase/server";
import { FloatingNavbar } from "./FloatingNavbar";

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

/**
 * Represents the navigation items in the navbar.
 */
const navItems = [
  /**
   * Represents the "Anasayfa" navigation item.
   */
  {
    name: "Anasayfa",
    link: "/",
  },
  /**
   * Represents the "Keşfet" navigation item.
   */
  {
    name: "Keşfet",
    link: "/explore",
  },
  /**
   * Represents the "Topluluk" navigation item.
   */
  {
    name: "Topluluk",
    link: "community",
  },
];
