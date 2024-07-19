"use client";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState, React } from "react";
import { Dropdown, Button } from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, RadioGroup, Radio} from "@nextui-org/react";

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
        <Dropdown>
      <DropdownTrigger>
        <Button 
          color={color}
          variant={variant}
          className="capitalize"
        >
          {variant}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Dropdown Variants"
        color={color} 
        variant={variant}
      >
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
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
