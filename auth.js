import passport from 'koa-passport';
import { Strategy as GoogleStrategy } from 'passport-google';

import { User } from './db/data.js';

//Passes User ID to application for session management
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//Gets user data for a session
passport.deserializeUser((id, done) => {
    var user = await User.findById(id);
    done(null, user);
});



passport.use(new GoogleStrategy({
    returnURL: "http://localhost/auth/google/return",
    realm: "http://localhost"
  },
  function(identifier, profile, done) {

      (async ()  => {
          var user = await User.findById(identifier);
          return done(null, user);
      })();
  }
));
