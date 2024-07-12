"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";

export default function MiniNavbar({
  navItems,
  username,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  username: string | null;
  className?: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
  }

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.nav
      variants={container}
      initial="hidden"
      animate="visible"
      className={cn(
        `sticky top-5 z-40 mx-auto flex w-fit select-none flex-row items-center justify-center gap-2 text-nowrap rounded-2xl px-4 text-2xl`,
        className,
      )}
    >
      <motion.div
        variants={item}
        className={cn(
          `text-text-100 flex w-fit flex-row flex-wrap justify-center gap-2 rounded-2xl border p-4 text-base shadow-2xl backdrop-blur-2xl`,
        )}
      >
        {navItems.map((navItem, idx) => (
          <motion.div
            variants={item}
            key={idx}
            className="transition-all duration-700 hover:scale-105 hover:font-bold"
            onDragStart={(e: any) => e.preventDefault()}
          >
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300",
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden text-sm sm:block">{navItem.name}</span>
            </Link>
          </motion.div>
        ))}
        <motion.div
          className="transition-all duration-700 hover:scale-105 hover:font-bold"
          variants={item}
        >
          <Link
            href={username ? "/me" : "/login"}
            className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white"
          >
            <span>{username ? "Profil" : "Giriş Yap"}</span>
            <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </Link>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}
