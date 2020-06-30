const express = require('express');
const router = express.Router();

const loginRoute = require('./login');
const signupRoute = require('./signup');
const protectedRoute = require('./protected');

router.use('/login', loginRoute);
router.use('/signup', signupRoute)
router.use('/protected', protectedRoute)

module.exports = router;
