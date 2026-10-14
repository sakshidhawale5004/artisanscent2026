import fs from "node:fs";
import path from "node:path";

const candidates = [
  path.resolve(".vercel/output/static"),
  path.resolve(".output/public"),
  path.resolve("dist"),
];

const source = candidates.find((dir) => fs.existsSync(path.join(dir, "index.html")));

if (source) {
  for (const target of candidates) {
    if (target !== source) {
      fs.mkdirSync(target, { recursive: true });
      fs.cpSync(source, target, { recursive: true });
    }
  }
  console.log(`Successfully mirrored static build from ${source} to all output targets.`);
} else {
  console.warn("No static build source directory with index.html found.");
}
