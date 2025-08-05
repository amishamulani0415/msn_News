const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorHandler");
const newsRouter = require("./routes/newsRoutes");
import AdminRouter from "./routes/admin.route.js";
import UserRouter from "./routes/user.route.js"

const app = express();

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user",UserRouter)
app.use("/api/v1/msnclone", newsRouter);
app.use("/api/v1/admin",AdminRouter)
app.all("*", (req, res, next) => {
  next(new AppError(`The URL ${req.originalUrl} does not exist`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
