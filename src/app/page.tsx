import { FeaturesSectionDemo } from "@/components/ui/Features";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";
import { createClient } from "@/lib/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data;

  return (
    <section className="flex flex-col gap-20">
      <main className="mx-auto flex w-fit flex-col place-items-center justify-center gap-2">
        <div>
          <h1 className="flex w-full flex-row flex-wrap-reverse items-center justify-center gap-2 text-6xl font-semibold">
            CODENEST
            <Image
              src="/icons/favicon.ico"
              width={45}
              height={45}
              alt="logo"
              className="tranisition-all select-none duration-700 ease-in-out hover:-rotate-45 hover:scale-110"
            />
          </h1>
          <p className="my-2 flex w-full items-center justify-center text-2xl text-muted">
            Projeleri Keşfet, Paylaş ve İş Birliği Yap
          </p>
        </div>
        <div className="flex h-auto items-center justify-center gap-[0.9375rem] px-[1.5625rem]">
          <Link
            href={"/new"}
            className="flex h-10 cursor-pointer items-center justify-center rounded-2xl border border-gray-500 px-6 text-gray-200 transition-all duration-200 ease-in-out hover:text-gray-500"
          >
            Başlayın
          </Link>
          {!user.user ? (
            <Link
              href={"/login"}
              className="flex h-10 cursor-pointer items-center justify-center rounded-2xl border border-gray-500 px-6 text-gray-200 transition-all duration-200 ease-in-out hover:text-gray-500"
            >
              Giriş Yap
            </Link>
          ) : (
            <></>
          )}
        </div>
        <Link
          href={"https://discord.gg/PtP372mA"}
          className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-gray-500 px-6 text-gray-200 transition-all duration-200 ease-in-out hover:text-gray-500"
        >
          <FaDiscord size={22} />
          <span>Topluluğa katılın</span>
        </Link>
      </main>
      <FeaturesSectionDemo />
      <InfiniteMovingCards items={testimonials} />
    </section>
  );
}

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
