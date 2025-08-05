import mongoose from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

const NewsModel = mongoose.model("News", newsSchema);

export default NewsModel; // ✅ ESM default export
