"use client";

import React from "react";
import { cn } from "@/lib/utils";
import TokenVisualisation from "../_ui/token-visualisation";
import TokenMetadata from "../_ui/token-metadata";
import { useBubbleContext } from "@/context/bubble-context";

export default function App() {
  const { mapData } = useBubbleContext();

  return (
    <div className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-[#080112]">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:30px_30px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      <div className="">
        <TokenMetadata />
      </div>

      {/* Radial gradient for the container to give a faded look */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          mapData
            ? "pointer-events-auto"
            : "pointer-events-none bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"
        )}
      >
        <TokenVisualisation />
      </div>
      <div className="absolute bottom-0 z-20 w-full max-w-4xl p-6 text-center text-sm text-gray-300 backdrop-blur-sm rounded-lg">
        <p>Interactive visualization of top transactions of a token.</p>
        <p>
          Larger bubbles represent higher trading volume. Colors indicate profit
          percentages.
        </p>
        <p>
          Hover over nodes for details. Drag nodes to rearrange. Scroll to zoom
          in/out.
        </p>
      </div>
    </div>
  );
}
