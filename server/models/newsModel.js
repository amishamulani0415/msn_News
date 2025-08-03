const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    newsTitle: {
      type: String,
      required: true,
      trim: true,
    },
    media: {
      type: String,
      required: false,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },

    // add remaining fields as necessary
    // e.g., content, author, date, etc.
  },
  {
    timestamps: true,
  }
);

const NewsModel = mongoose.model("News", newsSchema);

module.exports = NewsModel;
