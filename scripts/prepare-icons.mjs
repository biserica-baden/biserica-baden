import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const source = fileURLToPath(new URL('../src/assets/saint-athanasius.jpg', import.meta.url));
const output = new URL('../public/icons/', import.meta.url);
await mkdir(output, { recursive: true });

for (const size of [32, 64, 192, 256]) {
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`,
  );
  await sharp(source)
    .rotate()
    .resize(size, size, { fit: 'cover', position: 'north' })
    .ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toFile(fileURLToPath(new URL(`athanasius-${size}.png`, output)));
}

console.log('Circular Athanasius icons generated.');
