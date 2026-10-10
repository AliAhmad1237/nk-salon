import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const imgDir = path.resolve('assets/images');
const files = fs.readdirSync(imgDir).filter(f => f.endsWith('.jpg'));

console.log('Optimizing images in:', imgDir);

let totalOriginal = 0;
let totalWebp = 0;
let totalJpg = 0;

for (const file of files) {
  const filePath = path.join(imgDir, file);
  const baseName = path.parse(file).name;
  const webpPath = path.join(imgDir, `${baseName}.webp`);
  const origSize = fs.statSync(filePath).size;
  totalOriginal += origSize;

  const inputBuffer = fs.readFileSync(filePath);

  // 1. Generate WebP
  await sharp(inputBuffer)
    .webp({ quality: 80, effort: 6 })
    .toFile(webpPath);
  const webpSize = fs.statSync(webpPath).size;
  totalWebp += webpSize;

  // 2. Re-compress JPEG with mozjpeg progressive in-place
  const newJpgBuffer = await sharp(inputBuffer)
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toBuffer();
  fs.writeFileSync(filePath, newJpgBuffer);
  const newJpgSize = newJpgBuffer.length;
  totalJpg += newJpgSize;

  console.log(
    file.padEnd(28),
    `Orig: ${(origSize / 1024).toFixed(1)} KB`,
    `-> WebP: ${(webpSize / 1024).toFixed(1)} KB (-${Math.round((1 - webpSize / origSize) * 100)}%)`,
    `-> JPG: ${(newJpgSize / 1024).toFixed(1)} KB (-${Math.round((1 - newJpgSize / origSize) * 100)}%)`
  );
}

console.log('--------------------------------------------------');
console.log(`Total Original JPG: ${(totalOriginal / 1024).toFixed(1)} KB`);
console.log(`Total Optimized JPG: ${(totalJpg / 1024).toFixed(1)} KB (-${Math.round((1 - totalJpg / totalOriginal) * 100)}%)`);
console.log(`Total WebP: ${(totalWebp / 1024).toFixed(1)} KB (-${Math.round((1 - totalWebp / totalOriginal) * 100)}%)`);
