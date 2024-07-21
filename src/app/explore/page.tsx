"use client";
import ContentCard from "@/components/ContentCard";
import { Input } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { Tables } from "../../../types/supabase";
import Loading from "../Loading";

const Page = () => {
  const [contents, setContents] = useState<Tables<"files">[]>([]);
  const [filteredContents, setFilteredContents] = useState<Tables<"files">[]>(
    [],
  );
  const [userMap, setUserMap] = useState<Record<string, Tables<"profiles">>>(
    {},
  );
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
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
          const url = `/api/get?table=files&count=15&page=${page}&sort=desc&columns=created_at,title,description,id,user_id&order=created_at`;
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

  useEffect(() => {
    if (searchQuery) {
      const filtered = contents.filter((content) =>
        content.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredContents(filtered);
    } else {
      setFilteredContents(contents);
    }
  }, [searchQuery, contents]);

  if (error && page === 1) return <div>Error loading files: {error}</div>;

  return (
    <section className="mx-auto flex flex-col place-items-center gap-5">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Keşfet</h1>
        <h2 className="text-xl font-bold text-muted">
          Topluluğumuz tarafından paylaşılan içerikleri keşfedin!
        </h2>
      </div>
      <div className="max-h-13 flex w-full flex-wrap pb-3 pl-3 pr-3 pt-3 sm:w-[30rem] md:w-[40rem] md:flex-nowrap">
        <Input
          type="text"
          label="Search..."
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </div>
      <main className="container grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredContents.map((file) => (
          <ContentCard
            key={file.id}
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
