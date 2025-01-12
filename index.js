const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const characterRoutes = require('./routes/characterRoutes');
require('dotenv').config(); // Load environment variables from .env

// Cloudinary configuration
const cloudinary = require('cloudinary').v2;

// Create an Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors());  // Enable Cross-Origin Resource Sharing for front-end access

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI
);

const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));
db.on('error', (err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/characters', characterRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
