import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto">
      <div className="relative flex min-h-72 flex-col place-items-center gap-10 rounded-2xl bg-transparent p-4">
        <p className="text-4xl font-bold">404</p>
        <div className="text-2xl font-bold">Sayfa Bulunamadı</div>
        <div className="text-center font-thin">
          Aradığınız Sayfayı Bulamadık.
          <br />
          Bir hata olduğunu düşünüyorsanız lütfen topluluk sayfası üzerinden
          iletişime geçin.
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
