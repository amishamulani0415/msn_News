import express from "express";
import * as newsController from "../controllers/newsController.js";
import upload from "../middlewares/mediaUploads.js";

const router = express.Router();

router
  .route("/msnews")
  .post(upload, newsController.createNews)
  .get(newsController.getAllNews);

router
  .route("/msnews/:id")
  .get(newsController.getNews)
  .patch(upload, newsController.updateNews)
  .delete(newsController.deleteNews);

export default router;
