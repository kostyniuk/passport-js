const express = require('express');
const app = express();

const bodyParser = require('body-parser')

const db = require('./config/db');

const addUserRoute = require('./routes/addUser');

require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
db()

const PORT = process.env.PORT || 8000

app.use('/addUser', addUserRoute)

app.get('/', (req, res, next) => {
  res.json('home page')
})


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})