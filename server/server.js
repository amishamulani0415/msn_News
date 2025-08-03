const dotenv = require("dotenv");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

const app = require("./app");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8080;

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

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
