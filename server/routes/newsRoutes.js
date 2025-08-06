// server/routes/newsRoutes.js
import express from "express";
import upload from "../middlewares/mediaUpload.js";
import {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";

const router = express.Router();

router.route("/")
  .post(upload, createNews)    // Create news with optional image
  .get(getAllNews);            // Get all news

router.route("/:id")
  .get(getNewsById)            // Get single news
  .put(upload, updateNews)     // Update news
  .delete(deleteNews);         // Delete news

export default router;
