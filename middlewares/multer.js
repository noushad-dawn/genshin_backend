const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dtfofiffw', // Replace with your Cloudinary cloud name
  api_key: '842283918965937',       // Replace with your Cloudinary API key
  api_secret: 'k5roYN94o82uBf3OGCFZZ6lPGN8'  // Replace with your Cloudinary API secret
});

// Cloudinary storage setup for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'genshin-characters',  // Folder where images will be uploaded in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // Supported image formats
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
