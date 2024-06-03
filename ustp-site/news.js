const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: false },
  publishedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
