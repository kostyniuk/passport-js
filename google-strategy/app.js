const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const path = require('path');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8000;

require('./config/db');
require('./models/UserGoogle');

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(morgan('tiny'));

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require('./routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server has been started on http://localhost:${PORT}`);
});
