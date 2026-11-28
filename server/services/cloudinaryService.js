'use strict';

const { v2: cloudinary } = require('cloudinary');

function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

function getConfiguredCloudinary() {
  if (!isCloudinaryConfigured()) {
    return null;
  }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
  return cloudinary;
}

function createSignedUploadParams({ folder = 'igloo-cms/general', resourceType = 'image', publicId = undefined }) {
  const client = getConfiguredCloudinary();
  if (!client) {
    return null;
  }

  const timestamp = Math.round(Date.now() / 1000);
  const cleanFolder = String(folder || 'igloo-cms/general')
    .replace(/[^a-zA-Z0-9/_-]/g, '')
    .replace(/^\/+|\/+$/g, '');

  const paramsToSign = {
    timestamp,
    folder: cleanFolder
  };
  if (publicId) {
    paramsToSign.public_id = String(publicId).replace(/[^a-zA-Z0-9/_-]/g, '');
  }

  const signature = client.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);

  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    timestamp,
    signature,
    folder: cleanFolder,
    publicId: paramsToSign.public_id || null,
    resourceType: resourceType === 'video' ? 'video' : 'image',
    uploadUrl: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/${resourceType === 'video' ? 'video' : 'image'}/upload`
  };
}

async function deleteCloudinaryAsset(publicId, resourceType = 'IMAGE') {
  const client = getConfiguredCloudinary();
  if (!client || !publicId || String(publicId).startsWith('local:')) {
    return { deleted: false, skipped: true };
  }
  const resType = resourceType === 'VIDEO' ? 'video' : 'image';
  return client.uploader.destroy(publicId, { resource_type: resType, invalidate: true });
}

module.exports = {
  isCloudinaryConfigured,
  getConfiguredCloudinary,
  createSignedUploadParams,
  deleteCloudinaryAsset
};
