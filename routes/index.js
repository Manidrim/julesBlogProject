const express = require('express');
const router = express.Router();
const Article = require('../models/article');

// @route   GET /
// @desc    Get all published articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find({ published: true }).sort({ createdAt: 'desc' });
    res.render('index', { articles: articles });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   GET /articles/:id
// @desc    Get a single article
router.get('/articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article || !article.published) {
      return res.status(404).send('Article not found');
    }
    res.render('article', { article: article });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
