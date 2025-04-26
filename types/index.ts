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
