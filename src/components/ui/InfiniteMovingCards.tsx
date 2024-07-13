"use client";

import { cn } from "@/lib/utils/cn";
import { Card, CardFooter } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type InfiniteMovingCardsProps = {
  /**
   * Displayed items in the moving cards component.
   */
  items: Content[];
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
        "scroller relative flex max-w-7xl flex-col place-items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
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
            <Link href={`/code/${item.id}`}>
              <Card
                isFooterBlurred
                radius="lg"
                key={idx}
                className="rounded-2x relative min-h-32 w-[350px] flex-shrink-0 place-items-center border border-b-0 border-slate-700 px-8 py-6 transition-all duration-500 hover:scale-102 md:w-[450px]"
              >
                <p className="absolute top-0 -rotate-12 select-none text-3xl opacity-5">
                  {item.content[0].value}
                </p>
                <CardFooter className="absolute bottom-1 z-10 mx-4 flex w-fit flex-col overflow-hidden rounded-large border-1 border-slate-800 py-1 shadow-small before:rounded-xl before:bg-white/10">
                  <p className="text-lg font-bold text-white/80">
                    {item.title}
                  </p>
                  <p className="text-justify">
                    {item.description.substring(0, 40)}
                  </p>
                </CardFooter>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
