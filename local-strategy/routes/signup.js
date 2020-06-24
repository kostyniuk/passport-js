const express = require('express');

const router = express.Router();

const { genPassword } = require('../lib/passwordUtils');
// const connection = require('../config/db');
// const User = connection.models.User;

const User = require('../models/User');

router.post('/', async (req, res, next) => {
  try {
    const { username, password, salt } = req.body;

    const hash = await genPassword(password, salt);

    const data = {
      username,
      hash,
      salt,
    };

    const user = new User(data);

    await user.save();
    res.json(user);
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
