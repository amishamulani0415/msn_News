import News from "../models/newsModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

// Create News
export const createNews = catchAsync(async (req, res, next) => {
  const newsTitle = req.body.input;

  if (!newsTitle) {
    return next(new AppError("News title is required", 400));
  }

  let mediaPath = null;
  if (req.file) {
    mediaPath = req.file.path;
  }
  // else {
  //   return next(new AppError("Media file is required", 400));
  // }

  const description = req.body.description;
  if (!description) {
    return next(new AppError("Description is required", 400));
  }

  const news = await News.create({
    newsTitle,
    description,
    media: mediaPath,
  });

  res.status(201).json({
    status: "success",
    data: { news },
  });
});

// Get all news
export const getAllNews = catchAsync(async (req, res, next) => {
  const newsList = await News.find();
  res.status(200).json({
    status: "success",
    results: newsList.length,
    data: { news: newsList },
  });
});

// Get single news
export const getNews = catchAsync(async (req, res, next) => {
  const news = await News.findById(req.params.id);
  if (!news) return next(new AppError("News not found", 404));

  res.status(200).json({
    status: "success",
    data: { news },
  });
});

// Update news
export const updateNews = catchAsync(async (req, res, next) => {
  const updates = {};

  if (req.body.input) updates.newsTitle = req.body.input;
  if (req.body.description) updates.description = req.body.description;
  if (req.file) updates.media = req.file.path;

  const news = await News.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!news) return next(new AppError("News not found", 404));

  res.status(200).json({
    status: "success",
    data: { news },
  });
});

// Delete news
export const deleteNews = catchAsync(async (req, res, next) => {
  const news = await News.findByIdAndDelete(req.params.id);
  if (!news) return next(new AppError("News not found", 404));

  res.status(204).json({ status: "success", data: null });
});
