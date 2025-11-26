const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String },
  author: { type: String },
  publishedAt: { type: Date, default: Date.now },
  image: { type: String },
});

module.exports = mongoose.model('News', NewsSchema);
