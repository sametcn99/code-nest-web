import Link from "next/link";
import { FaTwitter, FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

export default function Footer() {
  return (
    <footer className="container mx-auto flex min-h-[30rem] flex-col justify-end px-4 text-gray-300">
      <div className="mb-4 text-center md:mb-0 md:text-left">
        <h2 className="text-xl font-semibold text-white">CODENEST</h2>
      </div>
      <div className="mb-4 flex flex-wrap justify-center space-x-4">
        {items.map((item, index) => (
          <Link className="hover:text-white" href={item.link} key={index}>
            {item.title}
          </Link>
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-4 md:mt-0">
        <Link
          href="https://sametcc.me/code-nest-web"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <FaGithub size={24} />
        </Link>
        <Link
          href="https://discord.gg/PtP372mA"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <FaDiscord size={24} />
        </Link>
        <Link
          href="https://code-nest-web.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <TbWorld size={24} />
        </Link>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
        <p>&copy; 2024 CodeNest. Tüm hakları saklıdır.</p>
      </div>
    </footer>
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
