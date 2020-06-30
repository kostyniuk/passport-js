const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');

const GoogleUser = mongoose.model('UserGoogle');

const parseProfile = require('../lib/parseGoogle');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${process.env.PORT}/login/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const data = parseProfile(profile);
      const { provider, providerId } = data;

      const user = await GoogleUser.findOne({ provider, providerId });
      console.log({ user });
      if (user) {
        console.log('User alredy exists');
        return done(null, user);
      } else {
        const newUser = new GoogleUser(data);
        const saved = await newUser.save();
        console.log({ saved });
        return done(null, saved);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log('Serialization');
  done(null, user.id);
});
passport.deserializeUser(function (obj, done) {
  console.log('I wont have jack shit');
  GoogleUser.findById(id, (err, user) => {
    if (err) return done(err);
    return done(null, user);
  });
});
