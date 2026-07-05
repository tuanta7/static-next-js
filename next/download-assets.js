/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const API_BASE = "http://localhost:3001";
const IMAGES_DIR = path.join(__dirname, "public", "images");

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  console.log(`Created ${IMAGES_DIR}`);
}

async function downloadImage(url, filename) {
  try {
    console.log(`Downloading ${url}...`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const filepath = path.join(IMAGES_DIR, filename);
    fs.writeFileSync(filepath, await response.buffer());
    console.log(`Downloaded to ${filepath}`);

    return `/images/${filename}`;
  } catch (error) {
    console.error(`Failed to download ${url}: ${error.message}`);
    return null;
  }
}

async function main() {
  try {
    console.log("Starting asset download\n");

    const imageUrl = await downloadImage(`${API_BASE}/images/sample.png`, "sample.png");

    if (imageUrl) {
      console.log("\nAssets downloaded successfully");
      console.log(`Available at: ${imageUrl}`);
    } else {
      console.log("\nAssets download failed");
      process.exit(1);
    }
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
}

main();
