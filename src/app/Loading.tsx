import React from "react";
import {Spinner} from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex h-full mt-5 w-full flex-col place-items-center justify-center">
      <div>
      <Spinner color="default" size={"lg"}/>

      </div>
    </div>
  );
}
