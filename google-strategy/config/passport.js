var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const parseProfile = require('../lib/parseGoogle');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/login/google/callback`
  },
  function(accessToken, refreshToken, profile, done) {

    console.log(profile)

    const data = parseProfile(profile)
    console.log({data})

    return done(null, {id: 3, name: 'Alex'})
  }
));