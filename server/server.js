import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js"; // ".js" extension zaroori hai in ESM

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Load environment variables
dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8080;

// MongoDB connection function
const connect = (uri) => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("DB connection Successful");
    })
    .catch((err) => {
      console.error(`DB connection failed: ${err.message}`);
      process.exit(1);
    });
};

connect(process.env.MONGO_URI);

// Start the server
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
