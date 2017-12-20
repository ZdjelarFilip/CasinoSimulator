import Router from 'koa-router';

import auth from '../auth';
import home from './home';
import account from './account';

var router = new Router();

//Passport initialization
router.use(auth.initialize());
router.use(auth.session());

//These URLs have no need for user authentication
router.use('/', home.routes(), home.allowedMethods());

//Check user authentication
app.use(async (ctx, next) {
	//Pass execution to account routes if user is authenticated
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.redirect('/login');
  }
});

//These URLs require user to be logged in
router.use('/account', account.routes(), account.allowedMethods());

export default router;
