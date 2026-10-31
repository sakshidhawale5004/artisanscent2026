import fs from "node:fs";
import path from "node:path";

const productIds = [
  // Perfumes
  "ivory-amber",
  "ocean-breeze",
  "lone-legend",
  "ocean-breeze-men",
  "ivory-oud",
  "wild-essence",
  "crimson-charm",
  "scarlet-spirit",
  "pure-musk",
  "ice-wave",
  "visionary",
  "royal-noir",

  // Essence Oils
  "patchouli-oil",
  "rosemary-oil",
  "citronella-oil",
  "geranium-oil",
  "palmarosa-oil",
  "lavender-oil",
  "lemongrass-oil",
  "menthol-oil",
  "vetiver-oil",

  // Car Perfumes
  "car-arctic-mist",
  "car-royal-valley",
  "car-regal-oud",
  "car-amber-heritage",
  "car-mystic-musk",

  // Agarbatti
  "agarbatti-premium",
  "agarbatti-deluxe",
  "agarbatti-pyramid",

  // Soaps
  "soap-signature",
  "soap-varad-ring",
];

const candidates = [
  path.resolve(".vercel/output/static"),
  path.resolve(".output/public"),
  path.resolve("dist"),
];

const source = candidates.find((dir) => fs.existsSync(path.join(dir, "index.html")));

if (source) {
  const indexHtml = fs.readFileSync(path.join(source, "index.html"), "utf-8");

  // Create product pages for each product ID
  const productsDir = path.join(source, "products");
  fs.mkdirSync(productsDir, { recursive: true });

  for (const id of productIds) {
    const productDir = path.join(productsDir, id);
    fs.mkdirSync(productDir, { recursive: true });
    fs.writeFileSync(path.join(productDir, "index.html"), indexHtml, "utf-8");
  }

  // Ensure products/index.html exists
  if (!fs.existsSync(path.join(productsDir, "index.html"))) {
    fs.writeFileSync(path.join(productsDir, "index.html"), indexHtml, "utf-8");
  }

  // Ensure 404.html exists for static fallback
  fs.writeFileSync(path.join(source, "404.html"), indexHtml, "utf-8");

  // Mirror source across all candidate directories
  for (const target of candidates) {
    if (target !== source) {
      fs.mkdirSync(target, { recursive: true });
      fs.cpSync(source, target, { recursive: true });
    }
  }

  console.log(`Successfully generated ${productIds.length} product pages and mirrored static build from ${source} to all output targets.`);
} else {
  console.warn("No static build source directory with index.html found.");
}
