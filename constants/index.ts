import {
  Arbitrum,
  Avalanche,
  Ethereum,
  Fantom,
  Solana,
  Polygon,
  Cronos,
  Base,
  BSC,
} from "@/public";

// Define token data with images and initial positions
export const tokenData = [
  { id: 1, src: Arbitrum, size: 60, speed: 0.5 },
  { id: 2, src: Avalanche, size: 70, speed: 0.7 },
  { id: 3, src: Ethereum, size: 80, speed: 0.4 },
  { id: 4, src: Fantom, size: 65, speed: 0.6 },
  { id: 5, src: Solana, size: 95, speed: 0.5 },
  { id: 6, src: Polygon, size: 55, speed: 0.8 },
  { id: 7, src: Cronos, size: 100, speed: 0.9 },
  { id: 8, src: Base, size: 85, speed: 0.3 },
  { id: 9, src: BSC, size: 60, speed: 0.3 },
];

export const tokens = [
  { id: "eth", name: "ETH", icon: Ethereum },
  { id: "bsc", name: "BSC", icon: BSC },
  { id: "ftm", name: "FTM", icon: Fantom },
  { id: "avax", name: "AVAX", icon: Avalanche },
  { id: "cro", name: "CRO", icon: Cronos },
  { id: "arb", name: "ARB", icon: Arbitrum },
  { id: "poly", name: "POLY", icon: Polygon },
  { id: "base", name: "BASE", icon: Base },
  { id: "sol", name: "SOL", icon: Solana },
  // { id: "sonic", name: "SONIC", icon: "/tokens/cro.png" },
];
