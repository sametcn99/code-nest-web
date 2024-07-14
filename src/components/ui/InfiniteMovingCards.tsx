"use client";

import { cn } from "@/lib/utils/cn";
import React, { useEffect, useState } from "react";
import { Tables } from "../../../types/supabase";
import ContentCard from "../Contents/ContentCard";

type InfiniteMovingCardsProps = {
  /**
   * Displayed items in the moving cards component.
   */
  items: Tables<"files">[];
  /**
   * Direction of the movement, can be 'left' or 'right'.
   * @default "left"
   */
  direction?: "left" | "right";
  /**
   * Speed of the animation in seconds.
   */
  speed: number;
  /**
   * Whether the animation should pause when the mouse hovers over.
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Additional CSS class names for styling.
   */
  className?: string;
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed,
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  });
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });
      containerRef.current.style.setProperty(
        "--animation-duration",
        `${speed}s`,
      );
      getDirection();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller w-full relative flex max-w-7xl flex-col place-items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <h2 className="text-2xl font-bold">SON PAYLAŞILANLAR</h2>
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li key={idx}>
            <ContentCard
              content={item }
              auth={false}
              className="min-h-80 w-80"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
