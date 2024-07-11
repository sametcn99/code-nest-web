"use client";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="flex flex-row justify-between">
      <div className="inline-flex gap-2">
        <Link href={"/"} target="_blank">
          Home
        </Link>{" "}
        <Link href={"/explore"} target="_blank">
          Explore
        </Link>
      </div>
      <div className="inline-flex">
        <Link href={"/me"}>Profile</Link>
      </div>
    </div>
  );
}
