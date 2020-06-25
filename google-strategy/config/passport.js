var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const parseProfile = require('../lib/parseGoogleInfo');

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