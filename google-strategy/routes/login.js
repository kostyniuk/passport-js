const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const UserGoogle = mongoose.model('UserGoogle');
const { validPassword } = require('../lib/passwordUtils');

router.post('/', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await UserGoogle.findOne({ username });
    if (!user) {
      res.status(401).json({ success: false, msg: 'could not find user' });
    }

    const isValidPassword = await validPassword(password, user.password);

    if (isValidPassword) {
      // const tokenObject = utils.issueJWT(user);

      res.status(200).json({ message: 'Successfully logged in' });

      // res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
    } else {
      res
        .status(401)
        .json({ success: false, msg: 'you entered the wrong password' });
    }
  } catch (e) {
    console.error(e);
  }

  const token = jwt.sign({ user: 'johndoe' }, 'secret');
  res.cookie('jwt', token, { httpOnly: true });
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
    res.redirect('/protected');
  }
);

module.exports = router;
