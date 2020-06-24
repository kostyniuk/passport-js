const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const { validPassword } = require('../lib/passwordUtils');

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, async (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Incorect username' }); //for using messages need to install flash
      const isValid = await validPassword(password, user.hash);
      if (!isValid) return done(null, false, { message: 'Incorect password' });
      return done(null, user);
    });
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) return cb(err);
    return cb(null, user);
  });
});
