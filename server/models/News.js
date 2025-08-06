// server/models/News.js
import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  headline: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },
  imageURL: { type: String },
}, { timestamps: true });

export default mongoose.model("News", newsSchema);
