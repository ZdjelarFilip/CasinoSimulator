import passport from 'koa-passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

import User from './models/user';

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
		clientID: GOOGLE_CLIENT_ID,
		clientSecret: GOOGLE_CLIENT_SECRET,
		callbackURL: "http://localhost/auth/google/return",
  },
  function(accessToken, refreshToken, profile, done) {
	  (async ()  => {
			try {
				var user = await User.findById(identifier);
				return done(null, user);
			}
			catch (err) {
				return done(err);
			}


	  })();
  }
));

export default passport;
