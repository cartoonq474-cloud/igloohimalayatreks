const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgDir = path.join(__dirname, '..', 'images');

async function getAllJpgs(dir) {
  const files = fs.readdirSync(dir);
  const jpgs = [];
  for (const f of files) {
    const fullPath = path.join(dir, f);
    const st = fs.statSync(fullPath);
    if (st.isFile()) {
      const ext = path.extname(f).toLowerCase();
      if (ext === '.jpg' || ext === '.jpeg') {
        jpgs.push({
          name: f,
          fullPath,
          size: st.size,
          baseName: f.substring(0, f.length - ext.length)
        });
      }
    }
  }
  return jpgs;
}

async function convertJpgToWebp(fileInfo) {
  const targetPath = path.join(imgDir, fileInfo.baseName + '.webp');
  try {
    const image = sharp(fileInfo.fullPath);
    const metadata = await image.metadata();

    let transform = sharp(fileInfo.fullPath);
    // If wider than 1920, scale down to 1920 max to avoid gigantic waste
    if (metadata.width && metadata.width > 1920) {
      transform = transform.resize({ width: 1920, withoutEnlargement: true });
    }

    await transform
      .webp({ quality: 82, effort: 4 })
      .toFile(targetPath);

    const newStat = fs.statSync(targetPath);
    return {
      success: true,
      originalSize: fileInfo.size,
      newSize: newStat.size,
      saved: fileInfo.size - newStat.size
    };
  } catch (err) {
    return {
      success: false,
      file: fileInfo.name,
      error: err.message
    };
  }
}

async function main() {
  console.log('=== BATCH JPG TO WEBP CONVERTER ===');
  console.log('Scanning images directory...');
  const jpgFiles = await getAllJpgs(imgDir);
  console.log(`Found ${jpgFiles.length} JPG/JPEG images to convert.`);

  const startTime = Date.now();
  let totalOriginal = 0;
  let totalNew = 0;
  let successCount = 0;
  let failCount = 0;
  const failures = [];

  const CONCURRENCY = 8;
  for (let i = 0; i < jpgFiles.length; i += CONCURRENCY) {
    const chunk = jpgFiles.slice(i, i + CONCURRENCY);
    const results = await Promise.all(chunk.map(convertJpgToWebp));

    for (let j = 0; j < results.length; j++) {
      const res = results[j];
      if (res.success) {
        successCount++;
        totalOriginal += res.originalSize;
        totalNew += res.newSize;
      } else {
        failCount++;
        failures.push(res);
      }
    }

    if ((i + CONCURRENCY) % 100 < CONCURRENCY || i + CONCURRENCY >= jpgFiles.length) {
      const progress = Math.min(i + CONCURRENCY, jpgFiles.length);
      const pct = ((progress / jpgFiles.length) * 100).toFixed(0);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`Progress: ${progress} / ${jpgFiles.length} (${pct}%) [${elapsed}s]`);
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('\n=== CONVERSION COMPLETE ===');
  console.log(`Successfully converted: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  if (failures.length > 0) {
    console.log('Failures:', failures);
  }
  console.log(`Original total size: ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`New WebP total size: ${(totalNew / (1024 * 1024)).toFixed(2)} MB`);
  const savings = totalOriginal - totalNew;
  const savingsPct = ((savings / totalOriginal) * 100).toFixed(1);
  console.log(`Total space saved: ${(savings / (1024 * 1024)).toFixed(2)} MB (${savingsPct}% reduction!)`);
  console.log(`Total processing time: ${totalTime} seconds`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
