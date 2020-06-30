const express = require('express');
const passport = require('passport');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8000;

require('./config/db');
require('./models/UserGoogle');

require('./config/passport')(passport);
app.use(passport.initialize());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require('./routes'));
// const bodyParser = require('body-parser');

app.listen(PORT, () => {
  console.log(`Server has been started on http://localhost:${PORT}`);
});
