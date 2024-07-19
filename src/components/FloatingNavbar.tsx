"use client";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

/**
 * Props for the FloatingNavbar component.
 */
type FloatingNavbarProps = {
  /** The navigation items to display in the floating navbar. */
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];

  /** The username of the authenticated user. */
  username: string | null;

  /** Additional CSS class names for the component. */
  className?: string;
};

/**
 * FloatingNavbar component displays a floating navigation bar with customizable navigation items.
 *
 * @component
 * @example
 * // Usage
 * <FloatingNavbar
 *   navItems={[
 *     { name: "Home", link: "/home", icon: <HomeIcon /> },
 *     { name: "About", link: "/about", icon: <AboutIcon /> },
 *     { name: "Contact", link: "/contact", icon: <ContactIcon /> },
 *   ]}
 *   username="JohnDoe"
 *   className="my-navbar"
 * />
 *
 * @param {Object[]} navItems - The navigation items to display in the floating navbar.
 * @param {string} navItems[].name - The name of the navigation item.
 * @param {string} navItems[].link - The link of the navigation item.
 * @param {JSX.Element} [navItems[].icon] - The icon element for the navigation item.
 * @param {string | null} username - The username of the authenticated user.
 * @param {string} [className] - Additional CSS class names for the component.
 * @returns {JSX.Element} The rendered FloatingNavbar component.
 */
export const FloatingNavbar = ({
  navItems,
  username,
  className,
}: FloatingNavbarProps) => {
  const [visible, setVisible] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "sticky inset-x-0 top-5 z-[5000] mx-auto flex max-w-fit flex-wrap items-center justify-center space-x-4 rounded-full border border-transparent py-2 pl-8 pr-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-xl dark:border-white/[0.2]",
          className,
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300",
            )}
          >
            <span>{navItem.icon}</span>
            <span>{navItem.name}</span>
          </Link>
        ))}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white"
          >
            Keşfet
          </button>
          {dropdownVisible && (
            <div
              className={cn(
                "absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg",
                "border border-transparent backdrop-blur-xl dark:border-white/[0.2]"
              )}
              style={{
                background:
                  "linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))",
              }}
            >
              <div className="py-1">
                <Link
                  href="/explore/users"
                  className="block px-4 py-2 text-sm text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300"
                >
                  Kullanıcılar
                </Link>
                <Link
                  href="/explore/codes"
                  className="block px-4 py-2 text-sm text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300"
                >
                  Kodlar
                </Link>
              </div>
            </div>
          )}
        </div>
        <Link
          href={username ? "/me" : "/login"}
          className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white"
        >
          <span>{username ? "Profil" : "Giriş Yap"}</span>
          <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};
