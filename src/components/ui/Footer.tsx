import { link } from "fs";
import Link from "next/link";
import { FaDiscord, FaYoutube, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#09090C] mt-10 text-white py-8 w-3/4	mx-auto pl-12 pr-12 bg-opacity-85 backdrop-blur">
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
    <div className="mb-4 md:mb-0">
      <h2 className="text-xl font-bold mb-2">Hakkımızda</h2>
      <p className="text-sm w-3/6">
      CODENEST, projelerinizi, kodlarınızı ve profillerinizi keşfetmek ve paylaşmak için bir platformdur. Katılın ve portföyünüzü geliştirmek için işbirliği yapın.
      </p>
    </div>
    <div className="mb-4 md:mb-0">
      <h2 className="text-xl font-bold mb-2 mr-auto">Hızlı Linkler</h2>
      <ul>
        <li><a href="#" className="text-sm hover:underline">Ana Sayfa</a></li>
        <li><a href="#" className="text-sm hover:underline">SSS</a></li>
        <li><a href="#" className="text-sm hover:underline">Projeler</a></li>
        <li><a href="#" className="text-sm hover:underline">Kodlar</a></li>
        <li><a href="#" className="text-sm hover:underline">Profiller</a></li>
      </ul>
    </div>
    <div>
      <h2 className="text-xl font-bold mb-2">Bizi Takip Edin</h2>
      <div className="flex space-x-4">
        <a href="#" className="text-2xl"><FaGithub /></a>
        <a href="#" className="text-2xl"><FaYoutube /></a>
        <a href="#" className="text-2xl"><FaDiscord /></a>
      </div>
    </div>
  </div>
  <div className="container mx-auto mt-8 flex justify-between items-center border-t border-gray-700 pt-4">
    <p className="text-sm">&copy; 2024 CODENEST. Tüm hakları saklıdır.</p>
    <div className="flex space-x-4">
      <a href="#" className="text-sm hover:underline">Gizlilik Politikası</a>
      <a href="#" className="text-sm hover:underline">Hizmet Şartları</a>
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
