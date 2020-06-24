const express = require('express');
const passport = require('passport')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();

require('dotenv').config()
const bodyParser = require('body-parser')
const connection = require('./config/db');

const signupRoute = require('./routes/signup');
const loginRoute= require('./routes/login');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: 'sessions'
})

app.use(
  session({
    secret: process.env.FOO_COOKIE_SECRET,
    saveUninitialized: true,
    resave: false,
    store: sessionStore,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);

// forgetting about this require all the time
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res, next) => {
  console.log(req.session)
  console.log(req.user)
  next()
})

const PORT = process.env.PORT || 8000

app.use('/signup', signupRoute)
app.use('/login', loginRoute)

app.get('/', (req, res, next) => {
  res.json('home page')
})


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})