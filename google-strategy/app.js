const express = require('express');
const passport = require('passport');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 8000;

require('./config/passport');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const loginRoute = require('./routes/login');
const protectedRoute = require('./routes/protected');
const signupRoute = require('./routes/signup');

app.use(passport.initialize());

app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/protected', protectedRoute);

app.get('/', (req, res) => {
  res.send('home page');
});

app.listen(PORT, () => {
  console.log(`Server has been started on http://localhost:${PORT}`);
});
