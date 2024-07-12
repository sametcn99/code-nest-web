import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { Database } from "../../../types/supabase";

export default function ProfileCard({
  userMetadata,
}: {
  userMetadata: Database["public"]["Tables"]["profiles"]["Row"];
}) {
  return (
    <Card className="flex flex-row p-4 gap-4">
      {userMetadata.avatar_url && (
      <Image src={userMetadata.avatar_url} width={100} height={100} alt="user avatar" className="rounded-2xl" />
      )}
        <div className="flex flex-col">
            <h2 className="text-3xl font-bold">{userMetadata.full_name}</h2>
            <p>{userMetadata.email}</p>
            <p>Discord ID: {userMetadata.sub}</p>
        </div>
    </Card>
  );
}
