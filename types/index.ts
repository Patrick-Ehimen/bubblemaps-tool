import { StaticImageData } from "next/image";

export interface Token {
  id: number;
  src: string | StaticImageData;
  size: number;
  speed: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
}
export interface TraderNode {
  id: string;
  type: "whale" | "retail";
  volume: number;
  transactions?: Transaction[];

  // D3 properties
  radius?: number;
  color?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface TraderLink {
  source: string | TraderNode;
  target: string | TraderNode;
  timestamp?: string;
  hash?: string;
  value?: number;
}

export interface Transaction {
  hash: string;
  timestamp: string;
  value: number;
}

export interface TraderData {
  nodes: TraderNode[];
  links: TraderLink[];
}

export interface AppState {
  data: TraderData | null;
  simulation: d3.Simulation<TraderNode, TraderLink>;
  svg: SVGSVGElement | null;
  zoomGroup: SVGGElement | null;
  zoom: d3.ZoomBehavior<Element, unknown>;
  link: d3.Selection<SVGLineElement, TraderLink, SVGGElement, unknown>;
  node: d3.Selection<SVGGElement, TraderNode, SVGGElement, unknown>;
  tooltip: HTMLElement | null;
  selectedNode: TraderNode | null;
  width: number;
  height: number;
  selectedChain: string;
}

export interface TokenMetadata {
  address: string;
  address_label: string;
  name: string;
  symbol: string;
  decimals: number;
  logo: string;
  logo_hash: string;
  thumbnail: string;
  total_supply: string;
  total_supply_formatted: string;
  fully_diluted_valuation: string;
  block_number: string;
  validated: boolean;
  created_at: string;
  possible_spam: string;
  verified_contract: string;
  categories: string[];
  links: Record<string, string>;
}

export interface Transaction {
  transactionHash: string;
  transactionType: "buy" | "sell";
  blockTimestamp: string;
  totalValueUsd: number;
  walletAddress: string;
  pairLabel: string;
  exchangeName: string;
  exchangeLogo: string;
}
