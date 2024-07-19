import Loading from "@/app/Loading";
import CodeView from "@/components/CodeView";
import RandomContents from "@/components/RandomContents";
import { createClient } from "@/utils/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Tables } from "../../../../types/supabase";

type Props = {
  params: { project: string; id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient();

  const { error, data } = await supabase
    .from("files")
    .select("*")
    .eq("content_id", params.project)
    .single();

  if (error) return notFound();

  let isUserDeleted = false;
  let user = (
    await supabase.from("profiles").select("*").eq("id", data.user_id).single()
  ).data as Tables<"profiles">;

  if (user === null) {
    isUserDeleted = true;
    user = {
      id: "0",
      avatar_url: null,
      full_name: "unknown",
      username: "unknown",
      email: "unknown@unknown.com",
      followers: null,
      followings: null,
      sub: "",
      website: null,
      banner_url: null,
      bio: null,
      roles: null,
    };
  }

  return {
    title: data.title,
    openGraph: {
      title: data.title,
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  if (!params.project) return notFound();
  let isRateLimitExceeded = false;
  if (searchParams?.error === "rate_limit_exceeded") {
    isRateLimitExceeded = true;
  }
  const supabase = createClient();
  const auth = await supabase.auth.getUser();
  const isAuth = auth.data.user !== null;

  const { error, data } = await supabase
    .from("files")
    .select("*")
    .eq("content_id", params.project)
    .single();

  if (error) return notFound();

  let isUserDeleted = false;
  let user = (
    await supabase.from("profiles").select("*").eq("id", data.user_id).single()
  ).data as Tables<"profiles">;

  if (user === null) {
    isUserDeleted = true;
    user = {
      id: "0",
      avatar_url: null,
      full_name: "unknown",
      username: "unknown",
      email: "unknown@unknown.com",
      followers: null,
      followings: null,
      sub: "",
      website: null,
      banner_url: null,
      bio: null,
      roles: null,
    };
  }

  return (
    <main className="mx-auto flex w-full flex-col gap-80">
      {data && user && (
        <CodeView
          content={data}
          user={user}
          isUserDeleted={isUserDeleted}
          isAuth={isAuth}
          viewerID={auth.data.user?.id}
          isRateLimitExceeded={isRateLimitExceeded}
        />
      )}
      {!data && user && <Loading />}
      <RandomContents />
    </main>
  );
}
