// Renders the Reels covers to out/covers/
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs";

const out = path.resolve("out/covers");
fs.mkdirSync(out, { recursive: true });
const browserExecutable = process.env.REMOTION_BROWSER || undefined;
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
for (const id of ["CoverHook", "CoverProduct"]) {
  const composition = await selectComposition({ serveUrl, id, browserExecutable });
  const output = path.join(out, `${id}.png`);
  await renderStill({ serveUrl, composition, output, browserExecutable });
  console.log("rendered", output);
}
