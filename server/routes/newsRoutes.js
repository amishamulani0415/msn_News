const express = require("express");
const newsController = require("../controllers/newsController");
const upload = require("../middlewares/mediaUploads");

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

module.exports = router;
