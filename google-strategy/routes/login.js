const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json('login page');
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    console.log('Redirected', req.user);
    res.json({status: 'success', user: req.user})
  }
);

module.exports = router;
