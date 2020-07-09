const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.json({ user: req.user });

    //   const token = jsonwebtoken.sign({ user: 'johndoe' }, jwtSecret);
    // res.cookie('token', token, { httpOnly: true });
  }
);

module.exports = router;
