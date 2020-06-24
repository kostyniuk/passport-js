const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./db');
const User = require('../models/User');
const {validPassword} = require('../lib/passwordUtils');

passport.use(new LocalStrategy(  (username, password, done) => {
  console.log({ username, password });
  User.findOne({username: username}, async (err, user) => {
    console.log({user})
    if(err) return done(err)
    if(!user) return done(null, false, {message: 'Incorect username'}) //for using messages need to install flash
    const isValid = await validPassword(password, user.hash)
    console.log({user, isValid, two: 2})
    if(!isValid) return done(null, false, {message: 'Incorect password'})
    return done(null, user)
  })
}));

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) return cb(err)
    return cb(null, user)
  })
})
