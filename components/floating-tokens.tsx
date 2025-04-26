"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Token } from "@/types";
import { tokenData } from "@/constants";

export function FloatingTokens() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Initialize tokens with random positions
  useEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    const initializedTokens = tokenData.map((token) => {
      return {
        ...token,
        x: Math.random() * containerWidth,
        y: Math.random() * containerHeight,
        vx: (Math.random() - 0.5) * token.speed,
        vy: (Math.random() - 0.5) * token.speed,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
      };
    });

    setTokens(initializedTokens);

    // Handle window resize
    const handleResize = () => {
      setTokens((prevTokens) =>
        prevTokens.map((token) => ({
          ...token,
          x: Math.min(token.x, window.innerWidth - token.size),
          y: Math.min(token.y, window.innerHeight - token.size),
        }))
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation loop
  useEffect(() => {
    if (tokens.length === 0) return;

    const animate = () => {
      setTokens((prevTokens) =>
        prevTokens.map((token) => {
          let newX = token.x + token.vx;
          let newY = token.y + token.vy;
          let newVx = token.vx;
          let newVy = token.vy;

          // Bounce off edges
          if (newX <= 0 || newX >= window.innerWidth - token.size) {
            newVx = -token.vx;
            newX = Math.max(0, Math.min(newX, window.innerWidth - token.size));
          }

          if (newY <= 0 || newY >= window.innerHeight - token.size) {
            newVy = -token.vy;
            newY = Math.max(0, Math.min(newY, window.innerHeight - token.size));
          }

          return {
            ...token,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            rotation: (token.rotation + token.rotationSpeed) % 360,
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [tokens.length]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {tokens.map((token) => (
        <div
          key={token.id}
          className="absolute"
          style={{
            left: `${token.x}px`,
            top: `${token.y}px`,
            transform: `rotate(${token.rotation}deg)`,
            width: `${token.size}px`,
            height: `${token.size}px`,
            transition: "transform 0.1s linear, filter 0.3s ease",
          }}
        >
          <Image
            src={token.src || "/placeholder.svg"}
            alt={`Crypto token ${token.id}`}
            width={token.size}
            height={token.size}
            className="w-full h-full object-contain blur-xs filter hover:cursor-pointer hover:blur-none"
          />
        </div>
      ))}
    </div>
  );
}
