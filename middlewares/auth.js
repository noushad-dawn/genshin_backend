require('dotenv').config();

const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(400).json({ message: 'Bad Request: API Key is missing' });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }

  next();
};

module.exports = validateApiKey;
