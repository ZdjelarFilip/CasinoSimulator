var passport = require('koa-passport');

var GoogleStrategy = require('passport-google').Strategy;

passport.use(new GoogleStrategy({
    returnURL: "http://localhost/auth/google/callback",
    realm: "http://localhost"
  },
  function(identifier, profile, done) {

    (async ()  => {
      profile.identifier = identifier;
      return done(null, profile);
    })();
    /*process.nextTick(function() {

      profile.identifier = identifier;
      return done(null, profile);
    })*/
  }
));
