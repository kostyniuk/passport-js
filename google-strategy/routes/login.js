const express = require('express');
const passport = require('passport');
const router = express.Router();
const mongoose = require('mongoose');
const UserGoogle = mongoose.model('UserGoogle');
const { validPassword } = require('../lib/passwordUtils');
const issueJWT = require('../lib/issueJwt');

router.post('/', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await UserGoogle.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: 'could not find user' });
    }

    const isValidPassword = await validPassword(password, user.password);

    if (isValidPassword) {
      const token = issueJWT(user);
      res.cookie('jwt', token, { httpOnly: true });
      return res
        .status(200)
        .json({ success: true, token, expiresIn: token.expires });
    } else {
      res
        .status(401)
        .json({ success: false, msg: 'you entered the wrong password' });
    }
  } catch (e) {
    console.error(e);
  }
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
    failureRedirect: '/api/login',
  }),
  (req, res) => {
    console.log('Redirected', req.user);
    const token = issueJWT(req.user);
    console.log({ token });
    res.cookie('jwt', token, { httpOnly: true });
    res.redirect('/login');
  }
);

router.get('/failure', (req, res, next) => {
  res.json({ success: false, msg: 'Auth failed' });
});

module.exports = router;
