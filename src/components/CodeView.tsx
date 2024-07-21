"use client";
import { downloadContents } from "@/actions/download-content";
import { followAction } from "@/actions/follow-actions";
import { addOrRemoveStarToContents } from "@/actions/star-actions";
import {
  getFileExtension,
  getLangFromFileExtension,
} from "@/utils/file-extensions-by-langs";
import { formatDate } from "@/utils/utils";
import { Button, Card, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiDownload } from "react-icons/hi";
import { LuCopy, LuStar, LuStarOff } from "react-icons/lu";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { irBlack } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { toast } from "sonner";
import { Tables } from "../../types/supabase";
import AskAI from "./AskAI";
import RateLimitExceeded from "./RateLimitExceeded";

type CodeViewProps = {
  /**content` represents the data related to a file, using the "files" table structure. */
  content: Tables<"files">;
  /**user` represents the data related to a user, using the "profiles" table structure. */
  user: Tables<"profiles">;
  /**isUserDeleted` indicates if the user has been deleted. */
  isUserDeleted: boolean;

  //**Is user authenticated */
  isAuth: boolean;

  //**Viewer ID */
  viewerID?: string;

  /**Is Rate Limit Exceeded */
  isRateLimitExceeded: boolean;
};

export default function CodeView({
  content,
  user,
  isUserDeleted,
  isAuth,
  viewerID,
  isRateLimitExceeded,
}: CodeViewProps) {
  const files: FileTypes[] = JSON.parse(JSON.stringify(content.content));
  const [isStarred, setIsStarred] = useState(
    content.starred_by?.includes(viewerID ? viewerID : "") ?? false,
  );
  const [starCount, setStarCount] = useState(content.starred_by?.length ?? 0);
  const [isFollowed, setIsFollowed] = useState(false);

  const postData = async (
    components: FileTypes[],
    title: string,
    description: string,
  ) => {
    try {
      const response = await fetch("/api/post-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ components, title, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to save components");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    if (!viewerID) return;
    if (user.followers?.includes(viewerID)) setIsFollowed(true);
    else setIsFollowed(false);
  }, [user.followers, viewerID]);

  return (
    <div className="place-items-left container mx-auto flex w-full flex-col justify-center gap-4">
      <div className="flex flex-row flex-wrap place-items-center justify-center rounded-xl">
        <Link
          href={`/user/${user.id}`}
          className="inline-flex gap-2 rounded-2xl p-2 px-4 text-lg font-bold transition-all duration-500 hover:bg-white/20"
          onClick={(e) => {
            if (isUserDeleted) {
              e.preventDefault();
            }
          }}
        >
          <Image
            alt="User Avatar"
            className="pointer-events-none cursor-pointer select-none rounded-full object-cover"
            height={50}
            src={user.avatar_url || "/images/default_avatar.png"}
            width={50}
          />
          <div className="ml-2 flex flex-col font-medium">
            <span>{user.username}</span>
            <span>@{user.full_name}</span>
          </div>
        </Link>
        <Button
          isIconOnly
          className="bg-transparent hover:text-blue-500"
          onClick={(e) => {
            if (isUserDeleted) {
              toast.error("Bu kullanıcı silinmiş.");
            }
            if (!isAuth || !viewerID) {
              toast.error("Bu özelliği kullanabilmek için giriş yapmalısınız.");
              return;
            }
            if (!isUserDeleted && user.id !== viewerID) {
              followAction(user, viewerID, isFollowed ? "Unfollow" : "Follow");
              setIsFollowed(!isFollowed);
            }
            if (user.id === viewerID) {
              toast.error("Kendinizi takip edemezsiniz.");
            }
          }}
        >
          {isFollowed ? (
            <SlUserFollowing size={22} />
          ) : (
            <SlUserFollow size={22} />
          )}
        </Button>
      </div>
      <div className="flex flex-col place-items-center justify-center">
        <p className="flex flex-row flex-wrap gap-2 text-2xl font-bold">
          {content.title}
        </p>
        <p className="px-2 text-muted md:max-w-[60%]">
          {content.description || "Açıklama eklenmemiş."}
        </p>
        <p className="text-muted">{formatDate(new Date(content.created_at))}</p>
        {isRateLimitExceeded && <RateLimitExceeded />}
        {!isRateLimitExceeded && (
          <>
            <AskAI content={content.content} isAuth={isAuth} />
            <Tabs aria-label="Options" variant={"underlined"}>
              {files?.map((file, index) => (
                <Tab key={index} title={file.filename} className="container">
                  <div className="inline-flex w-full flex-wrap place-items-center justify-center gap-2 rounded-xl border-b border-b-gray-500 py-2 pl-4 font-bold">
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
                        if (!isAuth || !viewerID) {
                          toast.error(
                            "Bu özelliği kullanabilmek için giriş yapmalısınız.",
                          );
                          return;
                        }
                        addOrRemoveStarToContents(
                          content.id,
                          content.starred_by ?? [],
                          viewerID,
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
                      <LuCopy size={22} className="cursor-pointer" />
                    </Button>
                    <Button
                      title="Download"
                      isIconOnly
                      className="bg-transparent hover:text-purple-600"
                      onClick={async () => {
                        const res = await downloadContents(files);
                      }}
                    >
                      <HiDownload size={22} className="cursor-pointer" />
                    </Button>
                  </div>
                  <div className="min-w-96">
                    {getLangFromFileExtension(
                      getFileExtension(file.filename) ?? "",
                    ) === "markdown" ? (
                      <Markdown>{file.value}</Markdown>
                    ) : (
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
                        language={getLangFromFileExtension(
                          getFileExtension(file.filename) ?? "",
                        )}
                        style={irBlack}
                        // showLineNumbers bunu ekleyince responsive bozuluyor daha sonra düzelt
                      >
                        {file.value}
                      </SyntaxHighlighter>
                    )}
                  </div>
                </Tab>
              ))}
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}
