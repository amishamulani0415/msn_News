const News = require('../models/News');

exports.createNews = async (req, res) => {
  const { headline, description, category, imageURL } = req.body;
  const news = await News.create({ headline, description, category, imageURL });
  res.status(201).json(news);
};

exports.getAllNews = async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 });
  res.json(news);
};

exports.getNewsById = async (req, res) => {
  const news = await News.findById(req.params.id);
  res.json(news);
};

exports.deleteNews = async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.json({ message: 'News deleted' });
};
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await News.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(500).json({ error: 'Failed to update news' });
  }
};
