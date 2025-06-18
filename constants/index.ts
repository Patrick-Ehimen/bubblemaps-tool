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
  { id: "eth", name: "ETH", icon: Ethereum, hex: "0x1" },
  { id: "bsc", name: "BSC", icon: BSC, hex: "0x38" },
  { id: "fantom", name: "FTM", icon: Fantom, hex: "0xfa" },
  { id: "avalanche", name: "AVAX", icon: Avalanche, hex: "0xa86a" },
  { id: "arbitrum", name: "ARB", icon: Arbitrum, hex: "0xA4B1" },
  { id: "polygon", name: "POLY", icon: Polygon, hex: "0x89" },
  { id: "base", name: "BASE", icon: Base, hex: "0x2105" },
  { id: "cronos", name: "CRONOS", icon: Cronos, hex: "0x19" },
  { id: "solana", name: "SOL", icon: Solana },
  // { id: "sonic", name: "SONIC", icon: Sonic },
];

export const tokenHexId = [
  { id: "eth", hex: "0x1" },
  { id: "bsc", hex: "0x38" },
  { id: "fantom", hex: "0xfa" },
  { id: "avalanche", hex: "0xa86a" },
  { id: "arbitrum", hex: "0xA4B1" },
  { id: "polygon", hex: "0x89" },
  { id: "base", hex: "0x2105" },
  { id: "cronos", hex: "0x19" },
  { id: "solana", icon: Solana },
  // { id: "sonic", name: "SONIC", icon: Sonic },
];

// Create a mapping object for hex values
/* This code snippet is creating a mapping object called `tokensHex` that maps token IDs to their
corresponding hexadecimal values. */
export const tokensHex = tokens.reduce((acc, token) => {
  acc[token.id] = token.hex; // Map token id to hex value
  return acc;
}, {} as Record<string, string | undefined>);
