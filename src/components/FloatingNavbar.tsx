"use client"; // For client-side interactions

import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DropdownIcon, CopyIcon, EditIcon, DeleteIcon } from "@/icons"; // Assuming you have icons 

type DropdownMenuItem = {
  label: string;
  shortcut?: string;
  icon?: JSX.Element;
  action?: () => void;
  dangerZone?: boolean;
};

const FloatingDropdown = ({
  menuItems,
  className,
}: {
  menuItems: DropdownMenuItem[];
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={toggleDropdown}
        className="rounded-full border border-transparent py-2 px-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-xl dark:border-white/[0.2]"
      >
        Open Menu
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-800"
          >
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={item.action}
                  className={cn(
                    "flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-700",
                    item.dangerZone && "text-red-500"
                  )}
                >
                  {item.icon && item.icon}
                  {item.label}
                  {item.shortcut && (
                    <span className="ml-auto text-xs text-gray-500">
                      {item.shortcut}
                    </span>
                  )}
                </button>
                {item.dangerZone && <hr className="border-red-500" />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingDropdown;
