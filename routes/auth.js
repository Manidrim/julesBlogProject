const express = require('express');
const router = express.Router();
const passport = require('passport');

// @route   GET /auth/login
// @desc    Show login page
router.get('/login', (req, res) => {
  res.render('login');
});

// @route   POST /auth/login
// @desc    Login user
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);
});

// @route   GET /auth/logout
// @desc    Logout user
router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
  });
});

module.exports = router;
