'use strict';

/**
 * Indexes existing /images and /video assets into PostgreSQL MediaAsset table,
 * enriching image dimensions from data/image_cache.json.
 * Optional flag: --cloudinary uploads files to Cloudinary if credentials are set.
 */
require('dotenv').config({ override: false });
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { isCloudinaryConfigured, getConfiguredCloudinary } = require('../server/services/cloudinaryService');

const prisma = new PrismaClient();
const ROOT_DIR = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT_DIR, 'images');
const VIDEO_DIR = path.join(ROOT_DIR, 'video');
const CACHE_PATH = path.join(ROOT_DIR, 'data', 'image_cache.json');

const IMAGE_EXTS = new Set(['.webp', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.avif']);
const VIDEO_EXTS = new Set(['.mp4', '.webm', '.mov']);

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walkFiles(full, out);
    } else {
      out.push({ full, stat });
    }
  }
  return out;
}

async function run() {
  const uploadToCloudinary = process.argv.includes('--cloudinary');
  const cloudinaryClient = uploadToCloudinary && isCloudinaryConfigured() ? getConfiguredCloudinary() : null;

  let imageCache = {};
  if (fs.existsSync(CACHE_PATH)) {
    try {
      imageCache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
    } catch (_err) {
      imageCache = {};
    }
  }

  const imageFiles = walkFiles(IMAGES_DIR).filter((f) => IMAGE_EXTS.has(path.extname(f.full).toLowerCase()));
  const videoFiles = walkFiles(VIDEO_DIR).filter((f) => VIDEO_EXTS.has(path.extname(f.full).toLowerCase()));
  const allFiles = [
    ...imageFiles.map((f) => ({ ...f, resourceType: 'IMAGE', baseRoot: IMAGES_DIR, folderPrefix: 'images' })),
    ...videoFiles.map((f) => ({ ...f, resourceType: 'VIDEO', baseRoot: VIDEO_DIR, folderPrefix: 'video' }))
  ];

  console.log(`Found ${imageFiles.length} images and ${videoFiles.length} videos to index...`);

  if (!cloudinaryClient) {
    const existingRows = await prisma.mediaAsset.findMany({ select: { cloudinaryPublicId: true } });
    const existingSet = new Set(existingRows.map((r) => r.cloudinaryPublicId));
    const toCreate = [];

    for (const item of allFiles) {
      const relFromRoot = path.relative(ROOT_DIR, item.full).replace(/\\/g, '/');
      const relFromType = path.relative(item.baseRoot, item.full).replace(/\\/g, '/');
      const dirPart = path.dirname(relFromType);
      const folder = dirPart === '.' ? item.folderPrefix : `${item.folderPrefix}/${dirPart}`.slice(0, 120);
      const ext = path.extname(item.full).toLowerCase().replace('.', '');
      const baseName = path.basename(item.full);
      const cachedDims = imageCache[baseName] || null;
      const cloudinaryPublicId = `local:${relFromRoot}`;

      if (existingSet.has(cloudinaryPublicId)) continue;
      existingSet.add(cloudinaryPublicId);

      const label = path.basename(item.full, path.extname(item.full)).replace(/[-_]+/g, ' ');
      toCreate.push({
        cloudinaryPublicId,
        resourceType: item.resourceType,
        secureUrl: `/${relFromRoot}`,
        legacyLocalPath: relFromRoot,
        format: ext,
        width: cachedDims ? cachedDims.width : null,
        height: cachedDims ? cachedDims.height : null,
        bytes: item.stat.size,
        folder,
        title: label,
        altText: label
      });
    }

    const CHUNK = 200;
    for (let i = 0; i < toCreate.length; i += CHUNK) {
      await prisma.mediaAsset.createMany({ data: toCreate.slice(i, i + CHUNK), skipDuplicates: true });
    }
    console.log(`Synced ${allFiles.length} media assets (${toCreate.length} new) into PostgreSQL.`);
    return;
  }

  let synced = 0;
  for (const item of allFiles) {
    const relFromRoot = path.relative(ROOT_DIR, item.full).replace(/\\/g, '/');
    const relFromType = path.relative(item.baseRoot, item.full).replace(/\\/g, '/');
    const dirPart = path.dirname(relFromType);
    const folder = dirPart === '.' ? item.folderPrefix : `${item.folderPrefix}/${dirPart}`.slice(0, 120);
    const ext = path.extname(item.full).toLowerCase().replace('.', '');
    const baseName = path.basename(item.full);
    const cachedDims = imageCache[baseName] || null;

    let cloudinaryPublicId = `local:${relFromRoot}`;
    let secureUrl = `/${relFromRoot}`;
    let width = cachedDims ? cachedDims.width : null;
    let height = cachedDims ? cachedDims.height : null;

    if (cloudinaryClient) {
      try {
        const uploaded = await cloudinaryClient.uploader.upload(item.full, {
          folder: `igloo-cms/${folder}`,
          use_filename: true,
          unique_filename: false,
          overwrite: false,
          resource_type: item.resourceType === 'VIDEO' ? 'video' : 'image'
        });
        cloudinaryPublicId = uploaded.public_id;
        secureUrl = uploaded.secure_url;
        width = uploaded.width || width;
        height = uploaded.height || height;
      } catch (err) {
        console.warn(`[Cloudinary] Skipped ${relFromRoot}: ${err.message}`);
      }
    }

    await prisma.mediaAsset.upsert({
      where: { cloudinaryPublicId },
      update: {
        secureUrl,
        legacyLocalPath: relFromRoot,
        format: ext,
        width,
        height,
        bytes: item.stat.size,
        folder
      },
      create: {
        cloudinaryPublicId,
        resourceType: item.resourceType,
        secureUrl,
        legacyLocalPath: relFromRoot,
        format: ext,
        width,
        height,
        bytes: item.stat.size,
        folder,
        title: path.basename(item.full, path.extname(item.full)).replace(/[-_]+/g, ' '),
        altText: path.basename(item.full, path.extname(item.full)).replace(/[-_]+/g, ' ')
      }
    });
    synced++;
  }

  console.log(`Synced ${synced} media assets into PostgreSQL.`);
}

run()
  .catch((err) => {
    console.error('Media catalog import failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
