"use client";

import React, { useEffect, useRef, useState } from "react";
// import * as d3 from "d3";

import { useBubbleContext } from "@/context/bubble-context";

export default function TokenVisualisation() {
  const { mapData, selectedToken, searchAddress } = useBubbleContext();

  const resultArray = Array.isArray(mapData?.result) ? mapData.result : null;
  const resultArrayLength = resultArray ? resultArray.length : 0;

  console.log("Result Array Length:", resultArrayLength);
  console.log("Result Array:", resultArray);
  console.log("Map Data:", mapData);
  console.log("Selected Token:", selectedToken);
  console.log("Search Value:", searchAddress);

  const chartRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapData) {
      setError("No map data available");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      // Process the mapData and create visualization
      createVisualization(mapData);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to process map data");
      setIsLoading(false);
      console.error("Error processing map data:", err);
    }
  }, [mapData]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      {isLoading && (
        <div className="flex items-center justify-center h-96">
          <div className="text-xl text-gray-500">Loading visualization...</div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center h-96">
          <div className="text-xl text-red-500">{error}</div>
        </div>
      )}

      <div className="w-full h-96 mb-4" ref={chartRef}></div>
    </div>
  );
}
