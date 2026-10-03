const sharp = require('sharp');
const fs = require('fs');

async function makeHero() {
  const leftSource = 'images/a-breathtaking-view-of-mount-everest-along-the-iconic-everest-base-camp-trek.webp';
  const rightSource = 'images/annapurna-circuit-luxury-trek-13-days-in-nepal.webp';

  const left = await sharp(leftSource)
    .resize(960, 960, { fit: 'cover', position: 'center' })
    .toBuffer();
    
  const right = await sharp(rightSource)
    .resize(960, 960, { fit: 'cover', position: 'center' })
    .toBuffer();

  const divider = Buffer.from(
    '<svg width="2" height="960" xmlns="http://www.w3.org/2000/svg"><rect width="2" height="960" fill="rgba(255,255,255,0.7)"/></svg>'
  );

  await sharp({
    create: {
      width: 1920,
      height: 960,
      channels: 4,
      background: { r: 14, g: 52, b: 88, alpha: 1 }
    }
  })
  .composite([
    { input: left, top: 0, left: 0 },
    { input: right, top: 0, left: 960 },
    { input: divider, top: 0, left: 959 }
  ])
  .webp({ quality: 88 })
  .toFile('images/everest-base-camp-vs-annapurna-circuit-hero.webp');
  
  console.log('Hero image successfully created!');
}

makeHero().catch(console.error);
