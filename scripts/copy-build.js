import fs from "node:fs";
import path from "node:path";
import { products } from "../src/lib/products.ts";

const candidates = [
  path.resolve(".vercel/output/static"),
  path.resolve(".output/public"),
  path.resolve("dist"),
];

const source = candidates.find((dir) => fs.existsSync(path.join(dir, "index.html")));

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

if (source) {
  const indexHtml = fs.readFileSync(path.join(source, "index.html"), "utf-8");

  // 1. Generate static product pages for each product in the catalog
  const productsDir = path.join(source, "products");
  fs.mkdirSync(productsDir, { recursive: true });

  for (const product of products) {
    const productDir = path.join(productsDir, product.id);
    fs.mkdirSync(productDir, { recursive: true });

    let productHtml = indexHtml
      .replace(
        /<title>.*?<\/title>/i,
        `<title>${escapeHtml(product.name)} | Artisan Scents</title>`
      )
      .replace(
        /<meta name="description" content=".*?"\s*\/?>/i,
        `<meta name="description" content="${escapeHtml(product.description)}" />`
      )
      .replace(
        /<meta property="og:title" content=".*?"\s*\/?>/i,
        `<meta property="og:title" content="${escapeHtml(product.name)} | Artisan Scents" />`
      )
      .replace(
        /<meta property="og:description" content=".*?"\s*\/?>/i,
        `<meta property="og:description" content="${escapeHtml(product.description)}" />`
      );

    fs.writeFileSync(path.join(productDir, "index.html"), productHtml, "utf-8");
  }

  // Also write 404.html using the SPA index.html so static web hosts fallback to SPA
  fs.writeFileSync(path.join(source, "404.html"), indexHtml, "utf-8");

  // Also ensure products/index.html exists
  if (!fs.existsSync(path.join(productsDir, "index.html"))) {
    fs.writeFileSync(path.join(productsDir, "index.html"), indexHtml, "utf-8");
  }

  // 2. Mirror everything from source to all output candidate directories
  for (const target of candidates) {
    if (target !== source) {
      fs.mkdirSync(target, { recursive: true });
      fs.cpSync(source, target, { recursive: true });
    }
  }

  // 3. Generate .vercel/output/config.json if .vercel/output directory exists
  const vercelOutputDir = path.resolve(".vercel/output");
  if (fs.existsSync(vercelOutputDir)) {
    const configPath = path.join(vercelOutputDir, "config.json");
    const vercelConfig = {
      version: 3,
      routes: [
        { handle: "filesystem" },
        {
          src: "/products/(.+)",
          dest: "/products/$1/index.html"
        },
        {
          src: "/(.*)",
          dest: "/index.html"
        }
      ]
    };
    fs.writeFileSync(configPath, JSON.stringify(vercelConfig, null, 2), "utf-8");
    console.log("Generated .vercel/output/config.json");
  }

  console.log(`Successfully generated ${products.length} product pages and mirrored static build from ${source} to all output targets.`);
} else {
  console.warn("No static build source directory with index.html found.");
}
