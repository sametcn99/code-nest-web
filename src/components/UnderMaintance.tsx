import Link from "next/link";
import React from "react";

export default function UnderMaintance() {
  return (
    <main className="mx-auto">
      <div className="relative flex min-h-72 flex-col place-items-center gap-10 rounded-2xl bg-transparent p-4">
        <div className="text-2xl font-bold">Bu sayfa geliştirme aşamasında</div>
        <div className="text-center font-thin">
          Bu sayfa henüz geliştirme aşamasındadır. Lütfen daha sonra tekrar
          deneyin.
        </div>
        <Link
          href="/"
          className="absolute bottom-0 w-fit rounded-2xl p-4 px-2 text-center hover:underline"
        >
          Ana Sayfa
        </Link>
      </div>
    </main>
  );
}
