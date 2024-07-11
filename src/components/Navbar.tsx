import Link from "next/link";
import { createClient } from "@/lib/utils/supabase/server";
import SignOut from "./SignOut";

export default async function Navbar() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="inline-flex gap-2">
          <Link href={"/"} target="_blank">
            Home
          </Link>
          <Link href={"/explore"} target="_blank">
            Explore
          </Link>
        </div>
        <div className="inline-flex gap-2">
          {data?.user ? (
            <>
              <Link href={"/me"} target="_blank">
                Profile
              </Link>
              <SignOut />
            </>
          ) : (
            <Link href={"/login"} target="_blank">
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
