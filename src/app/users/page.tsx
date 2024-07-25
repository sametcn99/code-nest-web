"use client";

import { useState } from "react";
import { Card, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { Tables } from "../../../types/supabase";
import {Input} from "@nextui-org/react";

interface ClientSideComponentProps {
  users: Tables<"profiles">[];
}

export default function ClientSideComponent({ users }: ClientSideComponentProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user => {
    const username = user.username?.toLowerCase() || "";
    const fullName = user.full_name?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    return username.includes(term) || fullName.includes(term);
  });

  return (
    <div className="w-full flex flex-col items-center">
      <Input type="text" label="Search Users..." className="w-[50%] mb-6 h-16	" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <Link href={`/user/${user.id}`} key={index}>
              <Card key={index} className="p-2 hover:scale-101">
                <CardHeader className="inline-flex gap-3">
                  <Image
                    src={user.avatar_url || "/images/default_avatar.png"}
                    alt={`${user.username || user.full_name}'s Avatar`}
                    width={100}
                    height={100}
                    draggable={false}
                    title={`${user.username || user.full_name}'s Avatar`}
                    className="rounded-xl"
                  />
                  <div className="flex flex-col text-sm">
                    <h2 className="text-2xl font-bold">
                      {user.username || user.full_name}
                    </h2>
                    <p>{user.roles?.join(", ")}</p>
                    <p>{user.bio || "Bio eklenmemiş."}</p>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))
        ) : (
          <p>Kullanıcı bulunamadı.</p>
        )}
      </div>
    </div>
  );
}
