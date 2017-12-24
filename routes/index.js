import Router from 'koa-router';

import auth from '../auth';

var router = new Router();

//Passport initialization
router.use(auth.initialize());
router.use(auth.session());

router.get('/login', function (ctx, next) {
	ctx.render('login');
});

router.get('/', isLoggedIn, function (ctx, next) {
	ctx.redirect('/account');
});

//Authentication routes
//URL of Google sing-in button
router.get('auth/google', auth.authenticate('google', { scope: ['profile', 'email'] }));
//Google Sign-in returns to this, then it redirects depending on sign-in success
router.get('/auth/google/return', auth.authenticate('google', {
	successRedirect: '/account',
	failureRedirect: '/login'
}));


//These URLs require user to be logged in
// router.use('/account', isLoggedIn, account.routes(), account.allowedMethods());


export default router;


//Check user authentication
async function isLoggedIn(ctx, next) {
	//Pass execution to account routes if user is authenticated
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.redirect('/login');
  }
}
