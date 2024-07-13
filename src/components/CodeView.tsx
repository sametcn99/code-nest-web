"use client";
import {
  getFileExtension,
  getLangByFileExtension,
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

export default function CodeView({
  content,
  user,
  title,
  description,
  starCount,
}: {
  content: FileTypes[];
  user: Tables<"profiles">;
  title: string;
  description: string;
  starCount: number;
}) {
  const [isUserDeleted, setIsUserDeleted] = useState(false);

  useEffect(() => {
    if (user.id === null || user.id === "0") {
      setIsUserDeleted(true);
    }
  }, [user]);

  // Check if data is an array before calling map
  if (!Array.isArray(content)) {
    console.error("Expected data to be an array, received:", typeof content);
    return null; // or return a placeholder component
  }

  return (
    <div className="place-items-left flex w-full flex-col justify-center gap-4">
      <div className="flex flex-row place-items-center justify-center rounded-xl">
        {user.avatar_url && (
          <Image
            alt="User Avatar"
            className="cursor-pointer rounded-full object-cover"
            height={50}
            src={user.avatar_url}
            width={50}
          />
        )}
        <div>
          <Link
            href={`/user/${user.sub}`}
            className="inline-flex gap-2 text-lg font-bold text-muted"
            onClick={(e) => {
              if (isUserDeleted) {
                e.preventDefault();
              }
            }}
          >
            <span className="ml-2 font-medium text-[#FFF]">
              @{user.full_name}
            </span>
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
          </Link>
        </div>
      </div>
      <div className="flex flex-col place-items-center justify-center">
        <p className="flex flex-row flex-wrap gap-2 text-2xl font-bold">
          {title}
        </p>
        <p className="text-muted">{description}</p>
        <Tabs aria-label="Options" variant={"underlined"}>
          {content.map((file, index) => (
            <Tab key={index} title={file.filename} className="">
              <div className="inline-flex place-items-center gap-2 py-2 pl-4 font-bold">
                <div className="cursor-default hover:text-yellow-400">
                  {getLangByFileExtension(
                    getFileExtension(file.filename) ?? "",
                  )}
                </div>
                <Button
                  title="Total Stars"
                  startContent={<LuStar size={"17.5"} />}
                  className="bg-transparent hover:text-red-600"
                >
                  {starCount}
                </Button>
                <Button
                  title="Copy"
                  isIconOnly
                  className="bg-transparent hover:text-green-600"
                >
                  <LuCopy size={"17.5"} className="cursor-pointer" />
                </Button>
                <Button
                  title="Download"
                  isIconOnly
                  className="bg-transparent hover:text-purple-600"
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
