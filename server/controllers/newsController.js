// server/controllers/newsController.js
import News from "../models/News.js";

// CREATE
export const createNews = async (req, res) => {
  try {
    const { headline, description, category } = req.body;

    if (!headline || !description) {
      return res.status(400).json({ error: "Headline and Description required" });
    }

    const imageURL = req.file ? `/mediaFiles/${req.file.filename}` : null;

    const news = await News.create({
      headline,
      description,
      category,
      imageURL,
    });

    res.status(201).json({ status: "success", data: news });
  } catch (err) {
    console.error("Create News Error:", err.message);
    res.status(500).json({ error: "Failed to create news" });
  }
};

// GET ALL
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json({ status: "success", results: news.length, data: news });
  } catch (err) {
    console.error("Get All Error:", err.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

// GET SINGLE
export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ error: "News not found" });

    res.json({ status: "success", data: news });
  } catch (err) {
    console.error("Get Single Error:", err.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

// UPDATE
export const updateNews = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.imageURL = `/mediaFiles/${req.file.filename}`;

    const updatedNews = await News.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!updatedNews) return res.status(404).json({ error: "News not found" });

    res.json({ status: "success", data: updatedNews });
  } catch (err) {
    console.error("Update Error:", err.message);
    res.status(500).json({ error: "Failed to update news" });
  }
};

// DELETE
export const deleteNews = async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "News not found" });

    res.json({ status: "success", message: "News deleted" });
  } catch (err) {
    console.error("Delete Error:", err.message);
    res.status(500).json({ error: "Failed to delete news" });
  }
};
