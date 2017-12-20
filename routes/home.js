import Router from 'koa-router';

var router = new Router();

router.post('/login', auth.authenticate('google', {
	successRedirect: '/account',
	failureRedirect: '/login'
}));

router.get('/login', (ctx, next) => {
	ctx.redirect('/');
});

router.get('/', (ctx, next) => {
	await ctx.render('index');
});

router.post('/auth/google/return')

export default router;
