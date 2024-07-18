import { cn } from "@/lib/utils/cn";
import { FaCloud, FaHeart } from "react-icons/fa";
import { FaTerminal } from "react-icons/fa6";
import { FiDollarSign } from "react-icons/fi";
import { GrHelpBook } from "react-icons/gr";
import { TbEaseInOut } from "react-icons/tb";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Geliştiriciler için Yapıldı",
      description:
        "Mühendisler, geliştiriciler, hayalperestler, düşünürler ve yapanlar için yapıldı.",
      icon: <FaTerminal />,
    },
    {
      title: "Kullanım Kolaylığı",
      description:
        "Kullanıcı dostu arayüzümüz sayesinde herkesin kolayca kullanabileceği bir platform.",
      icon: <TbEaseInOut />,
    },
    {
      title: "Tamamen Ücretsiz",
      description:
        "Fiyatlarımız piyasadaki en iyisi. Sınır yok, kilit yok, kredi kartı yok, ücret yok.",
      icon: <FiDollarSign />,
    },
    {
      title: "Topluluk",
      description:
        "Topluluğumuzda herkesin bir şeyler paylaşabileceği bir platform.",
      icon: <FaHeart />,
    },

    {
      title: "Güvenlik",
      description:
        "Verileriniz bizim için önemli. Güvenlik ve gizlilik ilkelerimize sadığız.",
      icon: <FaCloud />,
    },
    {
      title: "7/24 Desteğe Hazırız",
      description:
        "Her zaman yüzde yüz kullanılabiliriz. En azından yapay zeka ajanlarımız.",
      icon: <GrHelpBook />,
    },
  ];

  return (
    <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "group/feature relative flex flex-col py-10 dark:border-neutral-800 lg:border-r",
        (index === 0 || index === 3) && "dark:border-neutral-800 lg:border-l",
        index < 3 && "dark:border-neutral-800 lg:border-b",
      )}
    >
      {index < 3 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      )}
      {index >= 3 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      )}
      <div className="relative z-10 mb-4 px-10">{icon}</div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-blue-500 dark:bg-neutral-700" />
        <span className="inline-block transition duration-200 group-hover/feature:translate-x-2">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-muted">
        {description}
      </p>
    </div>
  );
};
