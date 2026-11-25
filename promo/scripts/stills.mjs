// Renders preview frames: node scripts/stills.mjs 10 40 66 ...
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs";

const frames = process.argv.slice(2).map(Number);
const out = path.resolve("out/stills");
fs.mkdirSync(out, { recursive: true });
const browserExecutable = process.env.REMOTION_BROWSER || undefined;

const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id: "MorentReel", browserExecutable });
for (const frame of frames) {
  const output = path.join(out, `f${String(frame).padStart(3, "0")}.png`);
  await renderStill({ serveUrl, composition, frame, output, browserExecutable });
  console.log("rendered", output);
}
