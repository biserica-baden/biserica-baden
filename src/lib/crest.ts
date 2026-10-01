import { resolve } from 'node:path';
import sharp from 'sharp';

let cached: Promise<string> | undefined;

// The official MOREOM coat of arms in its natural colours. A 3 px edge is
// trimmed to drop the thin frame line present in the source file.
async function render(width: number): Promise<string> {
  const source = sharp(resolve('src', 'assets', 'moreom-crest.png'));
  const { width: sourceWidth = 0, height: sourceHeight = 0 } = await source.metadata();
  const webp = await source
    .extract({ left: 3, top: 3, width: sourceWidth - 6, height: sourceHeight - 6 })
    .resize({ width })
    .webp({ quality: 84 })
    .toBuffer();
  return `data:image/webp;base64,${webp.toString('base64')}`;
}

export const crestImage = () => (cached ??= render(260));
