import passport from 'koa-passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

import User from './models/user';

// Passes User ID to application for session management
passport.serializeUser(function (user, done) {
	var sessionUser = { id: user.id, name: user.name, email: user.email, coins: user.coins };
	done(null, sessionUser);
});

// Gets user data for a session
passport.deserializeUser(function (id, done) {
	var user = await User.findById(id);
	done(null, user);
});



passport.use(new GoogleStrategy({
		clientID: GOOGLE_CLIENT_ID,
		clientSecret: GOOGLE_CLIENT_SECRET,
		callbackURL: "http://localhost/auth/google/return",
		passReqToCallback: true
  },
  function(accessToken, refreshToken, profile, done) {
	  (async function() {
			try {
				let user = await User.findById(profile.id);
				if (user) {
					return done(null, user);
				}
				else {
					let newUser = new User({
						id: profile.id,
						googleToken: accessToken,
						name: profile.displayName,
						email: profile.emails[0].value
					});

					await User.create(newUser);

					return done(null, newUser);
				}
			}
			catch (err) {
				return done(err);
			}
	  })();
  }
));

export default passport;
