"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Transaction } from "@/types";

import { useBubbleContext } from "@/context/bubble-context";

export default function TokenVisualisation() {
  const { mapData } = useBubbleContext();

  const svgRef = useRef<SVGSVGElement>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [hoveredTransaction, setHoveredTransaction] =
    useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resultArray = Array.isArray(mapData?.result) ? mapData.result : null;
  console.log("Result Array:", resultArray);
  // const resultArrayLength = resultArray ? resultArray.length : 0;

  useEffect(() => {
    console.log("mapData result:", mapData?.result);
    console.log(mapData, "mapData");

    if (mapData && Array.isArray(mapData.result)) {
      const formattedData = mapData.result.map((item) => ({
        transactionHash: item.transactionHash,
        transactionType: item.transactionType,
        blockTimestamp: item.blockTimestamp,
        totalValueUsd: item.totalValueUsd,
        walletAddress: item.walletAddress,
        pairLabel:
          item.pairLabel ||
          `${item.bought?.symbol || ""}/${item.sold?.symbol || ""}`,
        exchangeName: item.exchangeName,
        exchangeLogo: item.exchangeLogo,
      }));

      setTransactions(formattedData);
      console.log("Formatted Data:", formattedData);
      setIsLoading(false);
    } else if (!mapData) {
      setError("Error: mapData is not available");
      console.error("mapData is not available");
    } else {
      setError(
        "Error: resultArray is not available or not in the expected format"
      );
      console.error(
        "resultArray is not available or not in the expected format"
      );
    }
  }, [mapData]);

  useEffect(() => {
    if (!svgRef.current || transactions.length === 0) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    // Create a scale for bubble size based on totalValueUsd
    const maxValue = d3.max(transactions, (d) => d.totalValueUsd) || 5000;
    const radiusScale = d3.scaleSqrt().domain([0, maxValue]).range([5, 80]);

    // Create simulation for bubble positioning
    const simulation = d3
      .forceSimulation(transactions)
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .force(
        "collide",
        d3.forceCollide((d) => radiusScale(d.totalValueUsd) + 2)
      );

    // Create the bubbles
    const bubbles = svg
      .selectAll(".bubble")
      .data(transactions)
      .enter()
      .append("g")
      .attr("class", "bubble")
      .on("mouseover", (event, d) => {
        setHoveredTransaction(d);
      })
      .on("mouseout", () => {
        setHoveredTransaction(null);
      });

    // Add circles for each bubble
    bubbles
      .append("circle")
      .attr("r", (d) => radiusScale(d.totalValueUsd))
      .attr("fill", (d) => {
        if (d.transactionType === "buy") {
          return "rgba(0, 200, 100, 0.3)"; // Green for buy
        } else {
          return "rgba(255, 50, 50, 0.3)"; // Red for sell
        }
      })
      .attr("stroke", (d) => {
        if (d.transactionType === "buy") {
          return "rgb(0, 200, 100)"; // Green for buy
        } else {
          return "rgb(255, 50, 50)"; // Red for sell
        }
      })
      .attr("stroke-width", 1.5);

    // Add transaction type indicators (arrows)
    bubbles
      .append("g")
      .attr("class", "arrow")
      .attr("fill", "white")
      .attr("transform", (d) => `translate(0, 0)`)
      .html((d) => {
        if (d.transactionType === "buy") {
          return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>`;
        } else {
          return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>`;
        }
      });

    // Add background bubbles for decoration
    const backgroundBubbles = [];
    for (let i = 0; i < 100; i++) {
      backgroundBubbles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 15 + 5,
      });
    }

    svg
      .selectAll(".bg-bubble")
      .data(backgroundBubbles)
      .enter()
      .insert("circle", ":first-child")
      .attr("class", "bg-bubble")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", (d) => d.r)
      .attr("fill", "none")
      .attr("stroke", "rgba(128, 90, 213, 0.3)")
      .attr("stroke-width", 1);

    // Update bubble positions on simulation tick
    simulation.on("tick", () => {
      bubbles.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });

    // Handle window resize
    const handleResize = () => {
      simulation.force("x", d3.forceX(window.innerWidth / 2).strength(0.05));
      simulation.force("y", d3.forceY(window.innerHeight / 2).strength(0.05));
      simulation.alpha(1).restart();

      svg
        .attr("width", window.innerWidth)
        .attr("height", window.innerHeight)
        .attr("viewBox", [0, 0, window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      simulation.stop();
    };
  }, [transactions]);

  return (
    <div className="w-full h-full flex flex-col items-center relative bg-[#0a0118] overflow-hidden">
      <svg ref={svgRef} className="w-full h-full"></svg>

      {isLoading && (
        <div className="flex items-center justify-center h-96">
          <div className="text-xl text-gray-500">Loading visualization...</div>
        </div>
      )}

      {/* {error && (
        <div className="flex items-center justify-center h-96">
          <div className="text-xl text-red-500">{error}</div>
        </div>
      )} */}

      {/* Tooltip for hovered transaction */}
      {hoveredTransaction && (
        <div
          className="absolute max-w-48 p-4 bg-[#1a0b2e] border border-purple-500 rounded-lg shadow-lg text-white"
          style={{
            left: `${Math.min(
              window.innerWidth - 300,
              Math.max(20, (hoveredTransaction as any).x)
            )}px`,
            top: `${Math.min(
              window.innerHeight - 200,
              Math.max(20, (hoveredTransaction as any).y)
            )}px`,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-3 h-3 rounded-full ${
                hoveredTransaction.transactionType === "buy"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            ></div>
            <span className="font-bold">
              {hoveredTransaction.transactionType.toUpperCase()}
            </span>
          </div>
          <div className="text-sm opacity-80 mb-1">
            {hoveredTransaction.pairLabel} on {hoveredTransaction.exchangeName}
          </div>
          <div className="font-mono text-xs opacity-70 mb-2 truncate">
            Tx Hash:{hoveredTransaction.transactionHash.slice(0, 6)}...
            {hoveredTransaction.transactionHash.slice(-4)}
          </div>
          <div className="text-lg font-bold">
            $
            {hoveredTransaction.totalValueUsd.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="text-xs opacity-70 mt-1">
            {new Date(hoveredTransaction.blockTimestamp).toLocaleString()}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 z-50 left-4 p-4 bg-[#1a0b2e] bg-opacity-70 rounded-lg text-white">
        <div className="text-sm font-semibold mb-2">Transaction Types</div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs">Buy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-xs">Sell</span>
        </div>
      </div>
    </div>
  );
}
