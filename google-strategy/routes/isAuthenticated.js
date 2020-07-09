const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/api/login/failure' }),

  (req, res, next) => {
    const { _id, username } = req.user;

    if (req.isAuthenticated()) {
      return res.json({ success: true, isAuthenticated: true, data: { _id, username } });
    }

    return res.status(401).json({ success: false, isAuthenticated: false, data: null }); // will never be reached
  }
);

module.exports = router;
