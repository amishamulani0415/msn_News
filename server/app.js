import express from "express";
import morgan from "morgan";
import cors from "cors";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorHandler.js";
import newsRouter from "./routes/newsRoutes.js";
import AdminRouter from "./routes/admin.route.js";
import UserRouter from "./routes/user.route.js";

const app = express();

// Middlewares
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/msnclone", newsRouter);
app.use("/api/v1/admin", AdminRouter);

// Handle unknown routes
app.all("*", (req, res, next) => {
  next(new AppError(`The URL ${req.originalUrl} does not exist`, 404));
});

// Global error handler
app.use(globalErrorHandler);

export default app; // ✅ ESM default export
