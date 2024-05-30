const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
});

mongoose.model("News", newsSchema);
