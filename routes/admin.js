const express = require('express');
const router = express.Router();
const Article = require('../models/article');

// Middleware to ensure user is authenticated
const { ensureAuthenticated } = require('../config/auth');

// @route   GET /admin
// @desc    Admin dashboard
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('admin/index');
});

// @route   GET /admin/articles
// @desc    Get all articles
router.get('/articles', ensureAuthenticated, async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('admin/articles', { articles: articles });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   GET /admin/articles/new
// @desc    Show form to create new article
router.get('/articles/new', ensureAuthenticated, (req, res) => {
  res.render('admin/new_article');
});

// @route   POST /admin/articles
// @desc    Create a new article
router.post('/articles', ensureAuthenticated, async (req, res) => {
  const { title, content, published } = req.body;
  try {
    const newArticle = new Article({
      title,
      content,
      published: published === 'on'
    });
    await newArticle.save();
    req.flash('success_msg', 'Article created successfully');
    res.redirect('/admin/articles');
  } catch (err) {
    console.error(err);
    res.render('admin/new_article', {
      error_msg: 'Something went wrong',
      title,
      content,
      published
    });
  }
});

// @route   GET /admin/articles/:id/edit
// @desc    Show form to edit an article
router.get('/articles/:id/edit', ensureAuthenticated, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).send('Article not found');
    }
    res.render('admin/edit_article', { article: article });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /admin/articles/:id
// @desc    Update an article
router.put('/articles/:id', ensureAuthenticated, async (req, res) => {
  try {
    const { title, content, published } = req.body;
    await Article.findByIdAndUpdate(req.params.id, {
      title,
      content,
      published: published === 'on'
    });
    req.flash('success_msg', 'Article updated successfully');
    res.redirect('/admin/articles');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /admin/articles/:id
// @desc    Delete an article
router.delete('/articles/:id', ensureAuthenticated, async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Article deleted successfully');
    res.redirect('/admin/articles');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
