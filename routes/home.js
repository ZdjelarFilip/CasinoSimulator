import Router from 'koa-router';

var router = new Router();


router.get('/login', (ctx, next) => {
	ctx.render('login');
});

router.get('/', (ctx, next) => {
	//Show a diferent page if user is logged in
	if (ctx.isAuthenticated()) {
    await next();
  } else {
    await ctx.render('index');
  },
	//Logged in page
	(ctx, next) => {
		ctx.redirect('/account');
	}
});

//Authentication routes
//URL of Google sing-in button
router.get('auth/google', auth.authenticate('google', { scope: ['profile', 'email'] }));
//Google Sign-in returns to this, then it redirects depending on sign-in success
router.get('/auth/google/return', auth.authenticate('google', {
	successRedirect: '/account',
	failureRedirect: '/login'
}));

export default router;
