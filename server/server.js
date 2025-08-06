import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";  // ✅ make sure app.js path sahi hai

dotenv.config({ path: "./config.env" });

const DB = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(DB)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB Error:", err));
