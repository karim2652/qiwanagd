const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGE_DIR = path.join(__dirname, '../src/assets/images/projects');
const MAX_SIZE = 500 * 1024; // 500KB
const SUPPORTED_EXT = ['.webp', '.jpg', '.jpeg', '.png'];

function getAllImages(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllImages(filePath));
    } else if (SUPPORTED_EXT.includes(path.extname(file).toLowerCase())) {
      results.push(filePath);
    }
  });
  return results;
}

async function compressImage(filePath) {
  const { size } = fs.statSync(filePath);
  if (size <= MAX_SIZE) return;
  const ext = path.extname(filePath).toLowerCase();
  const tempPath = filePath + '.tmp';
  try {
    if (ext === '.webp') {
      await sharp(filePath).webp({ quality: 70 }).toFile(tempPath);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(filePath).jpeg({ quality: 70 }).toFile(tempPath);
    } else if (ext === '.png') {
      await sharp(filePath).png({ quality: 70 }).toFile(tempPath);
    }
    const newSize = fs.statSync(tempPath).size;
    if (newSize < size) {
      fs.renameSync(tempPath, filePath);
      console.log(`Compressed: ${filePath} (${(size/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB)`);
    } else {
      fs.unlinkSync(tempPath);
      console.log(`Skipped (no gain): ${filePath}`);
    }
  } catch (e) {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    console.error(`Error compressing ${filePath}:`, e.message);
  }
}

(async () => {
  const images = getAllImages(IMAGE_DIR);
  for (const img of images) {
    await compressImage(img);
  }
  console.log('Image compression complete.');
})(); 