const express = require('express');
const router = express.Router();

const loginRoute = require('./login');
const signupRoute = require('./signup');
const protectedRoute = require('./protected');
const isAuthenticatedRoute = require('./isAuthenticated')

router.use('/api/login', loginRoute);
router.use('/api/signup', signupRoute);
router.use('/api/protected', protectedRoute);
router.use('/api/isAuthenticated', isAuthenticatedRoute)

router.use('/api', (req, res) => {
  res.json('Home page');
});
module.exports = router;
