import passport from 'koa-passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt-nodejs-as-promised';

import User from './models/user';

// Passes User ID to application for session management
passport.serializeUser(function (user, done) {
	done(null, user.id);
});

// Gets user data for a session
passport.deserializeUser(function (id, done) {
	var user = await User.findById(id);
	done(null, user);
});


// Google Auth -- might remove it if we can't get OAuth keys
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
						email: profile.emails[0].value
					});

					await User.insert(newUser);

					return done(null, newUser);
				}
			}
			catch (err) {
				return done(err);
			}
	  })();
  }
));


// Local signup strategy
passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	function (req, username, password, done) {
		async function () {
			try {
				let user = await User.findByEmail(req.body.email);
				if (!user) {
					let hashedPassword = bcrypt.hashSync(str, bcrypt.genSaltSync(cost));

					let newUser = new User({
						username: username,
						password: hashedPassword,
						email: req.body.email,
					});

					await User.insert(newUser);

					return done(null, newUser);
				}
			}
			catch (err) {
				return done(err);
			}

		});
	}
));


// Local login strategy
passport.use('local-login', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	function (req, username, password, done) {
		async function () {
			try {
				let user = await User.findByUsername(username) || await User.findByEmail(email);
				if (user) {
					let hashedPassword = bcrypt.hashSync(str, bcrypt.genSaltSync(cost));

					if (bcrypt.compareSync(password, hashedPassword)) {
						return done(null, user);
					}
				}
			}
			catch (err) {
				return done(err);
			}

		});
	}
));


export default passport;
