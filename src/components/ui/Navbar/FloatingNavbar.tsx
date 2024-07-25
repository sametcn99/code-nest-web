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

/**
 * Props for the FloatingNavbar component.
 */
type FloatingNavbarProps = {
  /** The username of the authenticated user. */
  id: string | null;

  /** Additional CSS class names for the component. */
  className?: string;
};

/**
 * FloatingNavbar component displays a floating navigation bar with customizable navigation items.
 *
 * @component
 * @param {string | null} username - The username of the authenticated user.
 * @param {string} [className] - Additional CSS class names for the component.
 * @returns {JSX.Element} The rendered FloatingNavbar component.
 */
export const FloatingNavbar = ({ id, className }: FloatingNavbarProps) => {
  const visible = true;

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
          "sticky inset-x-0 top-5 z-[5000] mx-auto flex max-w-fit select-none flex-wrap items-center justify-center space-x-4 rounded-full border border-white/[0.2] py-2 pl-8 pr-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-xl",
          className,
        )}
      >
        <div className="flex gap-5">
          <Link
            href="/"
            className="bg-transparant relative flex place-items-center justify-center text-neutral-50 hover:text-neutral-300"
          >
            Anasayfa
          </Link>
          <Dropdown>
            <DropdownTrigger>
              <Button className="text-md bg-transparent">Keşfet</Button>
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
        </div>
        {id ? (
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant={"light"}
                className="relative rounded-full border border-white/[0.2] px-4 py-2 text-sm font-medium text-white"
              >
                Profil
                <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Menu" variant={"solid"}>
              <DropdownItem key="account" href={`/me`}>
                Hesap
              </DropdownItem>
              <DropdownItem key="share-code" href="/new">
                Kod Paylaş
              </DropdownItem>
              <DropdownItem
                key="logout"
                className="text-danger"
                color="danger"
                href="/api/signout"
              >
                Çıkış Yap
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Link
            href="/login"
            className="relative rounded-full border border-white/[0.2] px-4 py-2 text-sm font-medium text-white"
          >
            <span>Giriş Yap</span>
            <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </Link>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
