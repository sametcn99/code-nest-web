import { Card } from "@nextui-org/react";
import Image from "next/image";
import { Database } from "../../../types/supabase";
import Link from "next/link";

export default function ProfileCard({
  userMetadata,
  auth,
}: {
  userMetadata: Database["public"]["Tables"]["profiles"]["Row"];
  auth: boolean;
}) {
  return (
    <Card className="flex flex-row justify-center gap-4 p-4">
      {userMetadata.avatar_url && (
        <Image
          src={userMetadata.avatar_url}
          width={100}
          height={100}
          alt="user avatar"
          className="h-fit w-fit rounded-2xl"
        />
      )}
      <div className="flex flex-col gap-2">
        <div>
          <h2 className="text-3xl font-bold">{userMetadata.full_name}</h2>
          <p>{userMetadata.email}</p>
        </div>
        <p>Discord ID: {userMetadata.sub}</p>
        <Link
          href="/signout"
          className="w-fit rounded-2xl border-2 p-2 text-sm transition-all duration-700 hover:bg-rose-950 hover:bg-opacity-60"
        >
          Çıkış Yap
        </Link>
      </div>
    </Card>
  );
}
