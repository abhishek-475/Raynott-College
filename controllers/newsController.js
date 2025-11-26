const News = require('../models/News');

exports.getAllNews = async (req, res, next) => {
  try {
    const items = await News.find().sort({ publishedAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.getNews = async (req, res, next) => {
  try {
    const item = await News.findOne({ slug: req.params.slug });
    if (!item) return res.status(404).json({ message: 'News item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.createNews = async (req, res, next) => {
  try {
    const item = await News.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

exports.updateNews = async (req, res, next) => {
  try {
    const item = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'News not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.deleteNews = async (req, res, next) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'News deleted' });
  } catch (err) {
    next(err);
  }
};
