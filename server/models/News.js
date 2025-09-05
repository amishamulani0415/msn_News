const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  headline: String,
  description: String,
  category: String,
  imageURL: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('News', newsSchema);
