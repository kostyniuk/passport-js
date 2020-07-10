const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    req.logout();
    res.clearCookie('jwt')
    res.json('logged out')
  }
);

module.exports = router;
