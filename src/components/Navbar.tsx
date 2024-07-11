import { createClient } from "@/lib/utils/supabase/server";
import Link from "next/link";
import SignOut from "./SignOut";

export default async function Navbar() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <>
      <div className="flex flex-row justify-between p-2">
        <div className="inline-flex gap-2">
          <Link href={"/"} className="nav-item">
            Ana Sayfa
          </Link>
          <Link href={"/explore"} className="nav-item">
            Keşfet
          </Link>
        </div>
        <div className="inline-flex gap-2">
          {data?.user ? (
            <>
              <Link href={"/me"} className="nav-item">
                Profil
              </Link>
              <SignOut />
            </>
          ) : (
            <Link href={"/login"} className="nav-item">
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
