const express = require('express');

const router = express.Router();

const { genPassword } = require('../lib/passwordUtils');

const UserGoogle = require('../models/UserGoogle');

router.post('/', async (req, res, next) => {
  try {
    const { username, password, fullName, email, picture } = req.body;

    const hash = await genPassword(password);

    const data = {
      username,
      password,
      fullName,
      email,
      picture
    };

    const user = new UserGoogle(data);

    console.log({user})

    await user.save();
    res.json(user);
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
