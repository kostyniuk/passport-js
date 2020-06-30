const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const UserGoogle = mongoose.model('UserGoogle')

const { genPassword } = require('../lib/passwordUtils');

router.post('/', async (req, res, next) => {
  try {
    const { username, password, fullName, email, picture } = req.body;

    const hash = await genPassword(password);

    const data = {
      username,
      password: hash,
      fullName,
      email,
      picture
    };

    const user = new UserGoogle(data);

    await user.save();
    res.json(user);
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
