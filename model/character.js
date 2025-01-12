const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  element: { type: String, required: true },
  weaponType: { type: String, required: true },
  rarity: { type: Number, required: true },
  constellation: { type: String, required: true },
  region: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },  // Image URL from Cloudinary
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
