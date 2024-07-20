"use client";

import { useEffect, useRef, useState } from "react";
import ContentCard from "@/components/ContentCard";
import Loading from "../Loading";
import { Tables } from "../../../types/supabase";

const Page = () => {
  const [contents, setContents] = useState<Tables<"files">[]>([]);
  const [userMap, setUserMap] = useState<Record<string, Tables<"profiles">>>(
    {},
  );
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      setPage(1);
    }
  }, []);

  useEffect(() => {
    const fetchContents = async () => {
      if (page > 0 && hasMore && mounted.current) {
        setLoading(true);
        setError(null);
        try {
          const url = `/api/get?table=files&count=15&page=${page}&sort=desc&columns=created_at,title,description,id,user_id,content_id&order=created_at`;
          console.log("fetching contents", url);
          const res = await fetch(url);
          const data = await res.json();
          if (data.error) {
            throw new Error(data.error);
          }
          setContents((prevContents) => [...prevContents, ...data]);
          setHasMore(data.length > 0 ? true : false);
        } catch (error: unknown) {
          setHasMore(false);
          setError(
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
          );
        } finally {
          setLoading(false);
        }
      }
    };
    fetchContents();
  }, [page, hasMore, mounted]);

  useEffect(() => {
    const fetchUserMap = async () => {
      try {
        contents.forEach((content) => {
          if (!userMap[content.user_id]) {
            const url = `/api/get?table=profiles&columns=avatar_url, id, username, full_name&eq=${content.user_id}`;
            console.log("fetching user profile", url);
            fetch(url)
              .then((res) => res.json())
              .then((data) => {
                setUserMap((prevMap) => ({
                  ...prevMap,
                  [content.user_id]: data[0],
                }));
              });
          }
        });
      } catch (error) {
        console.error("Failed to fetch user profiles:", error);
      }
    };
    if (contents.length > 0) {
      fetchUserMap();
    }
  }, [contents]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 &&
        !loading &&
        hasMore === true
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  if (error && page === 1) return <div>Error loading files: {error}</div>;

  return (
    <section className="mx-auto flex flex-col place-items-center gap-5">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Keşfet</h1>
        <h2 className="text-2xl font-bold">
          Topluluğumuz tarafından paylaşılan içerikleri keşfedin!
        </h2>
      </div>
      <main className="container grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {contents.map((file) => (
          <ContentCard
            key={file.content_id}
            content={file}
            user={userMap[file.user_id]}
            auth={false}
          />
        ))}
      </main>
      {loading && <Loading />}
    </section>
  );
};

export default Page;
