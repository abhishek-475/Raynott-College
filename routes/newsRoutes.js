const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getAllNews,
  getNews,
  createNews,
  updateNews,
  deleteNews
} = require('../controllers/newsController');

router.get('/', getAllNews);
router.get('/:slug', getNews);
router.post('/', protect, admin, createNews);
router.put('/:id', protect, admin, updateNews);
router.delete('/:id', protect, admin, deleteNews);

module.exports = router;
