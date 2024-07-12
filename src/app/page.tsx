import Link from "next/link";

export default async function Home() {
  return (
    <main className="mx-auto flex flex-col justify-center place-items-center w-fit">
      <div>
        <h1 className="text-6xl w-full flex items-center justify-center font-semibold">
          CODENEST
        </h1>
        <p className="my-2 text-2xl w-full flex items-center justify-center text-muted">
          Projeleri Keşfet, Paylaş ve İş Birliği Yap
        </p>
      </div>
      <div className="h-auto flex items-center justify-center px-[1.5625rem] gap-[0.9375rem]">
        <Link
          href={"/new"}
          className="rounded-2xl flex px-6 h-10 items-center cursor-pointer justify-center text-gray-200 border border-gray-500  font-montserrat transition-all duration-200 ease-in-out  hover:text-gray-500"
        >
          Başlayın
        </Link>
        <Link
          href={"/login"}
          className="rounded-2xl flex px-6 h-10 items-center cursor-pointer justify-center text-gray-200 border border-gray-500  font-montserrat transition-all duration-200 ease-in-out  hover:text-gray-500"
        >
          Giriş Yap
        </Link>
      </div>
    </main>
  );
}
