import Link from "next/link";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

export default function Footer() {
  return (
    <footer className="mx-auto flex min-h-[25rem] w-full flex-col justify-end py-8 text-gray-300">
      <div className="container mx-auto self-end px-4">
        <div className="flex flex-col items-center justify-between gap-[20px] md:flex-row">
          <div className="mb-4 text-center md:mb-0 md:text-left">
            <h2 className="text-xl font-semibold text-white">CODENEST</h2>
          </div>
          <div className="mb-4 flex flex-wrap justify-center space-x-4 md:mb-0">
            {items.map((item, index) => (
              <Link className="hover:text-white" href={item.link} key={index}>
                {item.title}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex justify-center space-x-4 md:mt-0">
            <Link
              href="https://discord.gg/PtP372mA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              title="Discord"
            >
              <FaDiscord size={24} />
            </Link>
            <Link
              href="https://sametcc.me/code-nest-web"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              title="GitHub"
            >
              <FaGithub size={24} />
            </Link>
            <Link
              href="https://code-nest-web.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              title="CodeNest"
            >
              <TbWorld size={24} />
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
          <p>&copy; 2024 CodeNest. Tüm hakları saklıdır.</p>
        </div>
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
];
