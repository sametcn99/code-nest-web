import { Card, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import { Database } from "../../../types/supabase";

export default function ProfileCard({
  userMetadata,
}: {
  userMetadata: Database["public"]["Tables"]["profiles"]["Row"] | UserMetadata;
}) {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row">
          {userMetadata.avatar_url ? (
            <Image
              alt="User Profile Picture"
              width={200}
              height={200}
              src={userMetadata.avatar_url}
              className="rounded-2xl"
            />
          ) : (
            <></>
          )}
          <div>
            <h2 className="text-3xl font-bold">{userMetadata.full_name}</h2>
            <p>{userMetadata.email}</p>
            <p>Discord ID: {userMetadata.sub}</p>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}
