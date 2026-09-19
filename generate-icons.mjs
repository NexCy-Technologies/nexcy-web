import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.resolve(__dirname, 'public/NexCy_Logo.png');

async function generate() {
  const bgColor = { r: 10, g: 10, b: 10, alpha: 1 }; // #0A0A0A

  // 1. icon.png (512x512)
  await sharp(logoPath)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(path.resolve(__dirname, 'src/app/icon.png'));
    
  // 2. apple-icon.png (180x180)
  await sharp(logoPath)
    .resize(180, 180, { fit: 'contain', background: bgColor })
    .toFile(path.resolve(__dirname, 'src/app/apple-icon.png'));
    
  // 3. opengraph-image.png (1200x630)
  await sharp(logoPath)
    .resize(1200, 630, { fit: 'contain', background: bgColor })
    .toFile(path.resolve(__dirname, 'src/app/opengraph-image.png'));
    
  // 4. twitter-image.png (1200x630)
  await sharp(logoPath)
    .resize(1200, 630, { fit: 'contain', background: bgColor })
    .toFile(path.resolve(__dirname, 'src/app/twitter-image.png'));

  console.log('All icons generated successfully!');
}

generate().catch(console.error);
