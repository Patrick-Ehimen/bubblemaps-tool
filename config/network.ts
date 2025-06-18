export const config = {
  apiUrl: "/api/traders",
  nodeSizeRange: [10, 50],
  colors: {
    whale: "#ff6b8b",
    traders: "#4ade80",
    contract: "#3b82f6",
    linkDefault: "#8b95a8",
    linkHighlight: "#3a6df0",
  },
  explorers: {
    eth: { name: "Etherscan", baseUrl: "https://etherscan.io" },
    avax: { name: "Snowtrace", baseUrl: "https://snowtrace.io" },
    base: { name: "Basescan", baseUrl: "https://basescan.org" },
    bnb: { name: "BscScan", baseUrl: "https://bscscan.com" },
    arbi: { name: "Arbiscan", baseUrl: "https://arbiscan.io" },
    poly: { name: "PolygonScan", baseUrl: "https://polygonscan.com" },
    opt: {
      name: "Optimism Explorer",
      baseUrl: "https://optimistic.etherscan.io",
    },
    sol: { name: "Solscan", baseUrl: "https://solscan.io" },
    // sonic: {
    //   name: "Sonic Explorer",
    //   baseUrl: "https://explorer.sonic.network",
    // },
  },
};

export type ChainType = keyof typeof config.explorers;
