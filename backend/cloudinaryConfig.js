require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const  {CloudinaryStorage}  = require('multer-storage-cloudinary');
const multer = require('multer');

// console.log(process.env.CLOUDINARY_CLOUD_NAME,process.env.CLOUDINARY_API_KEY,process.env.CLOUDINARY_API_SECRET)
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });
cloudinary.config();
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatar_users',
    allowed_formats: ['jpg', 'png'],
    transformation: [
      { width: 500, height: 500, crop: 'fill', gravity: 'face' },
      { quality: 'auto' },
      { fetch_format: 'auto' }
    ]
  }
});

const uploadCloud = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 } // Giới hạn 2MB (tính bằng byte)
});

module.exports = uploadCloud;
