"use client";

/**
 * The above code defines a context provider and hook in TypeScript React for managing selected token,
 * search address, and map data.
 * @param  - The code you provided is setting up a context in React using the `createContext` function
 * from React. This context is called `BubbleContext` and it provides state and functions related to a
 * selected token, search address, and map data.
 * @returns The code snippet provided defines a React context called `BubbleContext` along with a
 * provider component `BubbleProvider` and a custom hook `useBubbleContext` to access the context
 * values.
 */

import { createContext, useContext, useState, ReactNode } from "react";
import { tokens } from "@/constants";

interface BubbleContextType {
  selectedToken: string;
  searchAddress: string;
  mapData: Record<string, unknown> | null;

  setSelectedToken: (token: string) => void;
  setSearchAddress: (address: string) => void;
  setMapData: (data: Record<string, unknown> | null) => void;
}

const BubbleContext = createContext<BubbleContextType | undefined>(undefined);

export function BubbleProvider({ children }: { children: ReactNode }) {
  const [selectedToken, setSelectedToken] = useState(tokens[0]?.id || "");
  const [searchAddress, setSearchAddress] = useState("");
  const [mapData, setMapData] = useState<Record<string, unknown> | null>(null);

  return (
    <BubbleContext.Provider
      value={{
        selectedToken,
        searchAddress,
        mapData,
        setSelectedToken,
        setSearchAddress,
        setMapData,
      }}
    >
      {children}
    </BubbleContext.Provider>
  );
}

export function useBubbleContext() {
  const context = useContext(BubbleContext);
  if (context === undefined) {
    throw new Error("useBubbleContext must be used within a BubbleProvider");
  }
  return context;
}
