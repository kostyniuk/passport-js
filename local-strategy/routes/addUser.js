const express = require('express');

const router = express.Router();

const User = require('../models/User');

router.post('/', async (req, res, next) => {

  

  const {username, password, salt} = req.body;

  console.log(req.body)

  const data = {
    username,
    hash: password,
    salt,
  }
  
  const user = new User(data);

  await user.save();
  res.json(user)
});

module.exports = router;
