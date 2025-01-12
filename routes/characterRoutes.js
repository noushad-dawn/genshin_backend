const express = require('express');
const router = express.Router();
const Character = require('../model/character');
const upload = require('../middlewares/multer');
const validateApiKey = require('../middlewares/auth');

// Utility function for validating required fields
const validateFields = (fields) => {
  return Object.keys(fields).every((key) => fields[key] && fields[key].trim() !== '');
};

// POST request to create a new character (protected)
router.post('/', validateApiKey, upload.single('image'), async (req, res) => {
  const { name, element, weaponType, rarity, constellation, region, description } = req.body;

  try {
    // Validate required fields
    if (
      !validateFields({
        name,
        element,
        weaponType,
        rarity,
        constellation,
        region,
        description,
      })
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate the uploaded image
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const newCharacter = new Character({
      name,
      element,
      weaponType,
      rarity,
      constellation,
      region,
      description,
      image: req.file.path,
    });

    const savedCharacter = await newCharacter.save();
    res.status(201).json({
      message: 'Character created successfully',
      data: savedCharacter,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating character',
      error: error.message,
    });
  }
});

// GET request to fetch all characters (no API key required)
router.get('/', async (req, res) => {
  try {
    const characters = await Character.find();
    res.status(200).json({
      message: 'Characters retrieved successfully',
      data: characters,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving characters',
      error: error.message,
    });
  }
});

// DELETE request to remove a character by ID (protected)
router.delete('/:id', validateApiKey, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the provided ID
    if (!id) {
      return res.status(400).json({ message: 'Character ID is required' });
    }

    const deletedCharacter = await Character.findByIdAndDelete(id);
    if (!deletedCharacter) {
      return res.status(404).json({ message: 'Character not found' });
    }

    res.status(200).json({ message: 'Character deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting character',
      error: error.message,
    });
  }
});

module.exports = router;
