const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');

const GoogleUser = mongoose.model('UserGoogle');

const parseProfile = require('../lib/parseGoogle');

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties

const cookieExtractor = function (req) {
  var token = null;
  if (req && Object.keys(req.cookies).length) {
    token = req.cookies['jwt'].token;
  }
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      console.log({ jwt_payload });

      try {
        const user = await GoogleUser.findById(jwt_payload.sub);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(err, false);
      }
      // or you could create a new account
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // callbackURL: `http://localhost:${process.env.PORT}/login/google/callback`,
        callbackURL: '/api/login/google/callback',
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

  passport.deserializeUser((id, done) => {
    GoogleUser.findOne(id, (err, user) => {
      if (err) return done(err);
      console.log({ user });
      return done(null, user);
    });
  });
};
