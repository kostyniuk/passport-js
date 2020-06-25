const express = require('express');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 8000;

require('./config/passport');

const loginRoute = require('./routes/login');
const protectedRoute = require('./routes/protected');

app.use('/login', loginRoute);
app.use('/protected', protectedRoute);

app.get('/', (req, res) => {
  res.send('home page');
});

app.listen(PORT, () => {
  console.log(`Server has been started on http://localhost:${PORT}`);
});
