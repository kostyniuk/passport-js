const express = require('express');

const app = express();

const PORT = process.env.PORT || 8000

app.get('/', (req, res, next) => {
  res.json('home page')
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})