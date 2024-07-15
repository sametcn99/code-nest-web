"use client";
import {
  getFileExtension,
  getLangFromFileExtension,
} from "@/lib/file-extensions-by-langs";
import { downloadContents } from "@/lib/utils/actions/download-content";
import { formatDate } from "@/lib/utils/utils";
import { Button, Card, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { HiDownload, HiOutlineUserAdd } from "react-icons/hi";
import { LuCopy, LuStar } from "react-icons/lu";
import SyntaxHighlighter from "react-syntax-highlighter";
import { irBlack } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { toast } from "sonner";
import { Tables } from "../../types/supabase";
import { addOrRemoveStarToContents } from "@/lib/utils/actions/star-actions";
import { useState } from "react";
import { LuStarOff } from "react-icons/lu";

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
  const [isStarred, setIsStarred] = useState(
    content.starred_by?.includes(user.id),
  );
  const [starCount, setStarCount] = useState(content.starred_by?.length ?? 0);

  return (
    <div className="place-items-left container mx-auto flex w-full flex-col justify-center gap-4">
      <div className="flex flex-row flex-wrap place-items-center justify-center rounded-xl">
        <Link
          href={`/user/${user.sub}`}
          className="inline-flex gap-2 rounded-2xl p-2 px-4 text-lg font-bold transition-all duration-500 hover:bg-white/20"
          onClick={(e) => {
            if (isUserDeleted) {
              e.preventDefault();
            }
          }}
        >
          {user.avatar_url && (
            <Image
              alt="User Avatar"
              className="pointer-events-none cursor-pointer select-none rounded-full object-cover"
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
            toast.error("Bu özellik şu anda kullanılamamaktadır.");
          }}
        >
          <HiOutlineUserAdd size={"20"} />
        </Button>
      </div>
      <div className="flex flex-col place-items-center justify-center">
        <p className="flex flex-row flex-wrap gap-2 text-2xl font-bold">
          {content.title}
        </p>
        <p className="px-2 text-muted md:max-w-[60%]">{content.description}</p>
        <p className="text-muted">{formatDate(new Date(content.created_at))}</p>
        <Tabs aria-label="Options" variant={"underlined"}>
          {files?.map((file, index) => (
            <Tab key={index} title={file.filename} className="container">
              <div className="inline-flex w-full place-items-center gap-2 rounded-xl border-b border-b-gray-500 py-2 pl-4 font-bold">
                <div className="cursor-default hover:text-yellow-400">
                  {getLangFromFileExtension(
                    getFileExtension(file.filename) ?? "",
                  )}
                </div>
                <Button
                  title="Total Stars"
                  startContent={isStarred ? <LuStarOff /> : <LuStar />}
                  className="bg-transparent hover:text-red-600"
                  onClick={() => {
                    addOrRemoveStarToContents(
                      content.id,
                      content.starred_by ?? [],
                      user.id,
                      isStarred ? "Remove" : "Add",
                    );
                    setIsStarred(!isStarred);
                    setStarCount(isStarred ? starCount - 1 : starCount + 1);
                  }}
                >
                  {starCount}
                </Button>
                <Button
                  title="Copy"
                  isIconOnly
                  className="bg-transparent hover:text-green-600"
                  onClick={() => {
                    navigator.clipboard.writeText(file.value);
                    toast.success("Kopyalandı");
                  }}
                >
                  <LuCopy size={"17.5"} className="cursor-pointer" />
                </Button>
                <Button
                  title="Download"
                  isIconOnly
                  className="bg-transparent hover:text-purple-600"
                  onClick={async () => {
                    const res = await downloadContents(content.content_id);
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
