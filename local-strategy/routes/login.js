const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Login page');
});

router.post(
  '/',
  passport.authenticate('local', {
    failureRedirect: '/login/failure',
    successRedirect: '/login/success',
  }),
  (err, req, res, next) => {
    if (err) next(err);
  }
);

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});
router.get('/success', (req, res, next) => {
  res.send('You successfully logged in.');
});
router.get('/failure', (req, res, next) => {
  res.send('You entered wrong credentials.');
});

module.exports = router;
