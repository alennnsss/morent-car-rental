import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;
export const DURATION = 540;

export const FONT = "Plus Jakarta Sans";

for (const weight of ["400", "500", "600", "700", "800"]) {
  loadFont({
    family: FONT,
    url: staticFile(`fonts/plus-jakarta-sans-latin-${weight}-normal.woff2`),
    weight,
  });
}

// Colors taken from the Morent site (src/style.css and components)
export const C = {
  blue: "#3563E9",
  sky: "#54A6FF",
  page: "#F6F7F9",
  ink: "#1A202C",
  slate: "#596780",
  muted: "#90A3BF",
  line: "#C3D4E9",
  white: "#FFFFFF",
  night: "#070B18",
  night2: "#0E1630",
  heart: "#ED3F3F",
  star: "#FBAD39",
};

export const img = (name: string) => staticFile(`img/${name}`);
export const icon = (name: string) => staticFile(`icons/${name}`);
