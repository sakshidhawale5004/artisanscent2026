import fs from "node:fs";
import path from "node:path";

const src = path.resolve(".output/public");
const dest = path.resolve("dist");

if (fs.existsSync(src)) {
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
  console.log("Successfully copied .output/public to dist for static deployment.");
} else {
  console.warn("Source directory .output/public does not exist.");
}
