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
