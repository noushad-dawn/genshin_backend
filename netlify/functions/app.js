const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const characterRoutes = require('./routes/characterRoutes');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Express app setup
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/characters', characterRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

module.exports.handler = serverless(app); // Export as a serverless function
