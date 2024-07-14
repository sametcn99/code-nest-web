"use client";
import {
  getFileExtension,
  getLangFromFileExtension,
} from "@/lib/file-extensions-by-langs";
import { Button, Card, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { HiDownload, HiOutlineUserAdd } from "react-icons/hi";
import { LuCopy, LuStar } from "react-icons/lu";
import SyntaxHighlighter from "react-syntax-highlighter";
import { irBlack } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Tables } from "../../types/supabase";
import { useEffect, useState } from "react";
import { downloadContents } from "@/lib/utils/actions/post-actions";

type CodeViewProps = {
  /**content` represents the data related to a file, using the "files" table structure. */
  content: Tables<"files">;
  /**user` represents the data related to a user, using the "profiles" table structure. */
  user: Tables<"profiles">;
  /**isUserDeleted` indicates if the user has been deleted. */
  isUserDeleted: boolean;
};

export default function CodeView({
  content,
  user,
  isUserDeleted,
}: CodeViewProps) {
  const files: FileTypes[] = JSON.parse(JSON.stringify(content.content));

  return (
    <div className="place-items-left flex w-full flex-col justify-center gap-4">
      <div className="flex flex-row flex-wrap place-items-center justify-center rounded-xl">
        <Link
          href={`/user/${user.sub}`}
          className="inline-flex gap-2 p-2 px-4 text-lg font-bold"
          onClick={(e) => {
            if (isUserDeleted) {
              e.preventDefault();
            }
          }}
        >
          {user.avatar_url && (
            <Image
              alt="User Avatar"
              className="cursor-pointer rounded-full object-cover"
              height={50}
              src={user.avatar_url}
              width={50}
            />
          )}
          <div className="ml-2 flex flex-col font-medium">
            <span>{user.username}</span>
            <span>@{user.full_name}</span>
          </div>
        </Link>
        <Button
          isIconOnly
          className="bg-transparent"
          onClick={(e) => {
            if (isUserDeleted) {
              e.preventDefault();
            }
          }}
        >
          <HiOutlineUserAdd size={"20"} />
        </Button>
      </div>
      <div className="flex flex-col place-items-center justify-center">
        <p className="flex flex-row flex-wrap gap-2 text-2xl font-bold">
          {content.title}
        </p>
        <p className="text-muted">{content.description}</p>
        <Tabs aria-label="Options" variant={"underlined"}>
          {files?.map((file, index) => (
            <Tab key={index} title={file.filename} className="">
              <div className="inline-flex place-items-center gap-2 py-2 pl-4 font-bold">
                <div className="cursor-default hover:text-yellow-400">
                  {getLangFromFileExtension(
                    getFileExtension(file.filename) ?? "",
                  )}
                </div>
                <Button
                  title="Total Stars"
                  startContent={<LuStar size={"17.5"} />}
                  className="bg-transparent hover:text-red-600"
                >
                  {content.star_count}
                </Button>
                <Button
                  title="Copy"
                  isIconOnly
                  className="bg-transparent hover:text-green-600"
                  onClick={() => {
                    navigator.clipboard.writeText(file.value);
                  }}
                >
                  <LuCopy size={"17.5"} className="cursor-pointer" />
                </Button>
                <Button
                  title="Download"
                  isIconOnly
                  className="bg-transparent hover:text-purple-600"
                  onClick={async () => {
                    await downloadContents(content.content_id);
                  }}
                >
                  <HiDownload size={"17.5"} className="cursor-pointer" />
                </Button>
              </div>
              <div className="min-w-96">
                <SyntaxHighlighter
                  key={index}
                  CodeTag={Card}
                  codeTagProps={{
                    style: {
                      backgroundColor: "transparent",
                      backdropFilter: "blur(0.253rem)",
                      padding: "1.3rem",
                    },
                  }}
                  wrapLongLines={true}
                  customStyle={{
                    backgroundColor: "transparent",
                  }}
                  useInlineStyles={true}
                  language="javascript"
                  style={irBlack}
                  // showLineNumbers bunu ekleyince responsive bozuluyor daha sonra düzelt
                >
                  {file.value}
                </SyntaxHighlighter>
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
