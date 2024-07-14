import { link } from "fs";
import Link from "next/link";
import { FaDiscord, FaYoutube, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="text-gray-300 py-8 w-full sm:w-[80%] md:w-[60%] mx-auto">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-center gap-[20px]">
      <div className="mb-4 md:mb-0 text-center md:text-left">
        <h2 className="text-xl font-semibold text-white">CODENEST</h2>
      </div>
      <div className="flex flex-wrap justify-center space-x-4 mb-4 md:mb-0">
        <a href="/" className="hover:text-white">Ana Sayfa</a>
        <a href="/explore" className="hover:text-white">Keşfet</a>
        <a href="/community" className="hover:text-white">Topluluk</a>
        <a href="/users" className="hover:text-white">Geliştiriciler</a>
        <a href="/developers" className="hover:text-white">Blog</a>
        <a href="/blog" className="hover:text-white">API</a>
        <a href="/api" className="hover:text-white">Dökümantasyon</a>
        <a href="/support" className="hover:text-white">Destek</a>
      </div>
      <div className="mt-4 md:mt-0 flex justify-center space-x-4">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.897-.959-2.178-1.555-3.594-1.555-2.723 0-4.928 2.205-4.928 4.917 0 .39.045.765.127 1.124-4.09-.205-7.719-2.165-10.141-5.144-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099-.807-.026-1.566-.247-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.19 1.394 4.798 2.211 7.597 2.211 9.142 0 14.307-7.721 14.307-14.415 0-.219-.005-.42-.014-.631.983-.711 1.85-1.6 2.53-2.614z"/>
          </svg>
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.758-1.333-1.758-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.238 1.84 1.238 1.07 1.835 2.809 1.304 3.495.997.108-.775.419-1.305.763-1.605-2.665-.306-5.466-1.337-5.466-5.93 0-1.31.465-2.382 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.838 1.23 1.91 1.23 3.22 0 4.61-2.805 5.62-5.475 5.92.435.372.81 1.102.81 2.222v3.293c0 .322.21.694.825.575C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M4.98 3.5c0 1.381-1.115 2.5-2.49 2.5S0 4.881 0 3.5 1.115 1 2.49 1s2.49 1.119 2.49 2.5zM.5 8.5h4.999v15H.5v-15zM8.5 8.5h5.108v2.302h.074c.712-1.35 2.453-2.77 5.048-2.77 5.41 0 6.41 3.524 6.41 8.109v9.359h-5v-8.341c0-1.981-.037-4.528-2.758-4.528-2.761 0-3.183 2.158-3.183 4.383v8.486h-5v-15z"/>
          </svg>
        </a>
      </div>
    </div>
    <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
      <p>&copy; 2024 Codenst. Tüm hakları saklıdır.</p>
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
