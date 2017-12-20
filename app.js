import Koa from 'koa';
import bodyParser from 'koa-body';
import cookie from 'koa-cookie';
import render from 'koa-ejs';

import path from 'path';

import router from './routes';

var app = new Koa();

//Initialize rendering engine
render(router, {
  root: path.join(__dirname, 'view'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});


//Error handling middleware
app.use(async (next) {
   try {
      await next;
   } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
   }
});

//Data parsing
app.use(bodyParser());
app.use(cookie());

app.use(async (ctx, next) => {
	// the parsed body will store in ctx.request.body
	// if nothing was parsed, body will be an empty object {}
	ctx.body = ctx.request.body;
	await next();
});

//Here we insert all routes
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || 3000);
