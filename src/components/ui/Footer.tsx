import { link } from "fs";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex min-h-80 w-full flex-col place-items-center justify-center rounded-2xl bg-black bg-opacity-30">
      <div className="grid grid-cols-4">
        {items.map((item, index) => (
          <div key={index} className="p-4">
            <Link href={`${item.link}`} className="block">
              <span>{item.title}</span>
            </Link>
          </div>
        ))}
      </div>
      <div>2024 © CodeNest. Tüm hakları saklıdır.</div>
    </div>
  );
}
const items = [
  {
    title: "Ana Sayfa",
    link: "/",
  },
  {
    title: "Keşfet",
    link: "/explore",
  },
  {
    title: "Topluluk",
    link: "/community",
  },
  {
    title: "Kullanıcılar",
    link: "/users",
  },
  {
    title: "Geliştiriciler",
    link: "/developers",
  },
  {
    title: "Blog",
    link: "/blog",
  },
  {
    title: "API",
    link: "/api",
  },
  {
    title: "Dökümantasyon",
    link: "/api/docs",
  },
  {
    title: "Destek",
    link: "/support",
  },
];
