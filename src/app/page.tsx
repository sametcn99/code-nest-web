import Link from "next/link";

export default async function Home() {
  return (
    <main className="mx-auto flex h-[60%] w-fit flex-col place-items-center justify-center">
      <div>
        <h1 className="flex w-full items-center justify-center text-6xl font-semibold">
          CODENEST
        </h1>
        <p className="my-2 flex w-full items-center justify-center text-2xl text-muted">
          Projeleri Keşfet, Paylaş ve İş Birliği Yap
        </p>
      </div>
      <div className="flex h-auto items-center justify-center gap-[0.9375rem] px-[1.5625rem]">
        <Link
          href={"/new"}
          className="font-montserrat flex h-10 cursor-pointer items-center justify-center rounded-2xl border border-gray-500 px-6 text-gray-200 transition-all duration-200 ease-in-out hover:text-gray-500"
        >
          Başlayın
        </Link>
        <Link
          href={"/login"}
          className="font-montserrat flex h-10 cursor-pointer items-center justify-center rounded-2xl border border-gray-500 px-6 text-gray-200 transition-all duration-200 ease-in-out hover:text-gray-500"
        >
          Giriş Yap
        </Link>
      </div>
    </main>
  );
}
