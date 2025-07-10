const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGE_DIR = path.join(__dirname, '../src/assets/images/home');
const MOBILE_WIDTH = 600;

fs.readdirSync(IMAGE_DIR).forEach(file => {
  if (file.endsWith('.webp') && !file.includes('-mobile')) {
    const inputPath = path.join(IMAGE_DIR, file);
    const outputPath = path.join(IMAGE_DIR, file.replace('.webp', '-mobile.webp'));
    sharp(inputPath)
      .resize({ width: MOBILE_WIDTH })
      .webp({ quality: 70 })
      .toFile(outputPath)
      .then(() => console.log(`Created: ${outputPath}`))
      .catch(err => console.error(`Error processing ${file}:`, err.message));
  }
}); 