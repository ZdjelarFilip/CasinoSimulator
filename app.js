import Koa from 'koa';
import bodyParser from 'koa-body';
import cookieParser from 'koa-cookie';
import render from 'koa-ejs';

import path from 'path';

import router from './routes';

var app = new Koa();

//Initialize rendering engine
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});


//Error handling middleware
app.use(async (next) {
   try {
      await next();
   } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
   }
});

//Request body (POST data etc.) and cookies
app.use(bodyParser());
app.use(cookieParser());

app.use(async (ctx, next) => {
	// the parsed body will store in ctx.request.body
	// if nothing was parsed, body will be an empty object {}
	ctx.body = ctx.request.body;
	await next();
});

//URL routing
app.use(router.routes());
app.use(router.allowedMethods());

//App listens on env PORT, or 3000 if PORT is undefined
app.listen(process.env.PORT || 3000);
