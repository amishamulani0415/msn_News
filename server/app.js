// app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import newsRouter from "./routes/newsRoutes.js";
import AdminRouter from "./routes/admin.route.js";
import UserRouter from "./routes/user.route.js";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorHandler.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// ✅ Routes
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/admin", AdminRouter);
app.use("/api/v1/msnclone", newsRouter); // ✅ frontend ke liye

app.get("/", (req, res) => res.send("Server running..."));

// Unknown route handler
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

export default app;
