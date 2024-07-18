"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";
import { Tables } from "../../types/supabase";
import ContentCard from "./ContentCard";

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

  /**
   * Title of the moving cards.
   */
  title: string;
};

/**
 * Renders a component that displays infinite moving cards.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.items - The array of items to display as cards.
 * @param {string} [props.direction="left"] - The direction of the card movement. Can be "left" or "right".
 * @param {number} props.speed - The speed of the card movement in seconds.
 * @param {boolean} [props.pauseOnHover=true] - Determines whether the card movement should pause on hover.
 * @param {string} [props.className] - Additional CSS class names for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed,
  pauseOnHover = true,
  className,
  title,
}: InfiniteMovingCardsProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  });

  const [start, setStart] = useState(false);

  /**
   * Adds the animation to the scroller.
   */
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

  /**
   * Sets the animation direction based on the specified direction prop.
   */
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
        "scroller relative mx-auto flex w-full max-w-7xl flex-col place-items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <h2 className="text-2xl font-bold">{title}</h2>
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
              content={item}
              auth={false}
              className="min-h-80 w-80"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
