import Router from 'koa-router';

import auth from '../auth';

var router = new Router();

// Passport initialization
router.use(auth.initialize());
router.use(auth.session());

// Login page
router.get('/login', function (ctx, next) {
	ctx.title('Login');
	ctx.render('login');
});

// Home page
// redirects to Account page
router.get('/', function (ctx, next) {
	if (ctx.isAuthenticated()) {
		ctx.redirect('account');
	}
	else {
		ctx.render('index');
	}
});

// Authentication routes
// URL of Google sing-in button
router.get('auth/google', auth.authenticate('google', { scope: ['profile', 'email'] }));
// Google Sign-in returns here, gives appropriate page
router.get('/auth/google/return', auth.authenticate('google', {
	successRedirect: '/account',
	failureRedirect: '/login'
}));

// Check user authentication
router.use(async function (ctx, next) {
	// Pass execution to account routes if user is authenticated
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.redirect('/login');
  }
});

// Account page
router.get('/account', function (ctx, next) {
	ctx.title('Home');
});


export default router;
