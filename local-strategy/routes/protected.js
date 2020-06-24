const express = require('express');
const router = express.Router();

const isAuth = require('../lib/isAuth')

router.get('/', isAuth, (req,res, next) => {
  res.json('Only authentificated users can be here!!!')
})

module.exports = router