"use client";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { IoMdStar } from "react-icons/io";
import { SlUserFollow } from "react-icons/sl";
import { Tables } from "../../types/supabase";
import SyntaxHighlighter from "react-syntax-highlighter";
import { irBlack } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  getFileExtension,
  getLangByFileExtension,
} from "@/lib/file-extensions-by-langs";

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
  // Check if data is an array before calling map
  if (!Array.isArray(content)) {
    console.error("Expected data to be an array, received:", typeof content);
    return null; // or return a placeholder component
  }

  return (
    <>
      <div className="flex w-full flex-col place-items-center justify-center gap-4">
        <div className="flex flex-row place-items-center justify-center rounded-xl">
          {user.avatar_url && (
            <Image
              alt="Woman listing to music"
              className="rounded-full object-cover"
              height={50}
              src={user.avatar_url}
              width={50}
            />
          )}
          <div>
            <Link
              href={`/user/${user.sub}`}
              className="inline-flex gap-2 text-lg font-bold text-muted"
            >
              <span>@{user.full_name}</span>
              <SlUserFollow size={22} />
            </Link>
          </div>
        </div>
        <div className="flex flex-col place-items-center justify-center">
          <p className="flex flex-row flex-wrap gap-2 text-2xl font-bold">
            {title}
            <span className="inline-flex place-items-center justify-center rounded-xl border-2 px-2 text-xl">
              <IoMdStar /> {starCount}
            </span>
          </p>
          <p className="text-muted">{description}</p>
          <Tabs aria-label="Options" variant={"underlined"}>
            {content.map((file, index) => (
              <Tab key={index} title={file.filename}>
                <div className="py-2 pl-4 font-bold">
                  <span>
                    {getLangByFileExtension(
                      getFileExtension(file.filename) ?? "",
                    )}
                  </span>
                </div>
                <SyntaxHighlighter
                  className="break-all bg-transparent"
                  customStyle={{
                    backgroundColor: "transparent",
                    wordBreak: "break-all",
                  }}
                  useInlineStyles={true}
                  language="javascript"
                  style={irBlack}
                  showLineNumbers
                >
                  {file.value}
                </SyntaxHighlighter>
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  );
}
