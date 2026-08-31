const { v2: cloudinary } = require('cloudinary');

/**
 * Cloudinary is configured from environment variables only.
 * YOU NEED TO DO THIS: sign up at https://cloudinary.com and populate
 * CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET in .env
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

module.exports = cloudinary;
