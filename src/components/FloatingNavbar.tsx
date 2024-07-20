"use client";
import { cn } from "@/utils/cn";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
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
          "sticky inset-x-0 top-5 z-[5000] mx-auto flex max-w-fit select-none flex-wrap items-center justify-center space-x-4 rounded-full border border-transparent py-2 pl-8 pr-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-xl dark:border-white/[0.2]",
          className,
        )}
      >
        <div className="flex gap-5">
          <Link
            href="/"
            className="bg-transparant relative flex items-center text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300"
          >
            Anasayfa
          </Link>
          <Dropdown>
            <DropdownTrigger>
              <Button className="bg-transparant relative ml-[-1.25rem] mr-[-1.25rem] flex items-center text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300">
                Keşfet
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dropdown Variants" variant={"solid"}>
              <DropdownItem key="contents" href="/explore">
                Kodlar
              </DropdownItem>
              <DropdownItem key="users" href="/users">
                Kullanıcılar
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Link
            href="https://discord.gg/squMTuffqS"
            className="bg-transparant relative flex items-center text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300"
          >
            Topluluk
          </Link>
        </div>
        {username ? (
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant={"light"}
                className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white"
              >
                Profil
                <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Menu" variant={"solid"}>
              <DropdownItem key="account" href="/me">
                Hesap
              </DropdownItem>
              <DropdownItem key="share-code" href="/new">
                Kod Paylaş
              </DropdownItem>
              <DropdownItem
                key="logout"
                className="text-danger"
                color="danger"
                href="/signout"
              >
                Çıkış Yap
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Link
            href="/login"
            className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white"
          >
            <span>Giriş Yap</span>
            <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </Link>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
