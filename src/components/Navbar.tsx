import React from "react";

export default function Navbar() {
  return (
    <div className="flex flex-row justify-between">
      <div className="inline-flex gap-2">
        <p>Home</p> <p>Explore</p>
      </div>
      <div className="inline-flex">
        <p>Profile</p>
      </div>
    </div>
  );
}
