const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3001';
const PUBLIC_DIR = path.join(__dirname, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  console.log(`✓ Created ${IMAGES_DIR}`);
}

async function downloadImage(url, filename) {
  try {
    console.log(`⏳ Downloading image from ${url}...`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const buffer = await response.buffer();
    const filepath = path.join(IMAGES_DIR, filename);

    fs.writeFileSync(filepath, buffer);
    console.log(`✓ Downloaded to ${filepath}`);

    return `/images/${filename}`;
  } catch (error) {
    console.error(`✗ Failed to download ${url}: ${error.message}`);
    return null;
  }
}

async function main() {
  try {
    console.log('Starting asset download...\n');

    // Download image from Express
    const imageUrl = await downloadImage(`${API_BASE}/image`, 'sample.png');

    if (imageUrl) {
      console.log(`\n✓ All assets downloaded successfully!`);
      console.log(`Image available at: ${imageUrl}`);
    } else {
      console.log(`\n✗ Some assets failed to download`);
      process.exit(1);
    }
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
