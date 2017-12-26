import Koa from 'koa';
import session from 'koa-session';
import server from 'koa-static';
import bodyParser from 'koa-body';
import cookieParser from 'koa-cookie';
import render from 'koa-ejs';
import logger from 'koa-logger';
import passport from 'koa-passport';

import path from 'path';

import router from './routes';


var app = new Koa();
const sessionConfig = {
  key: 'my secret key',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true
};

// Initialize rendering engine
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: true
});


// Error handling
app.use(async function (ctx, next) {
   try {
      await next();
   } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
   }
});

//Add title setter, cause koa-ejs is retarded
app.use(async function (ctx, next) {
  ctx.title = function(title) {
    if (title == '') {
      ctx.fullTitle = 'Coin Casino';
    }
    else {
      ctx.fullTitle = title + ' - Coin Casino';
    }
  };
});

// Request logging
app.use(logger());

app.use(serve('./public'));

// Request body (POST data etc.) and cookie parser
app.use(bodyParser());
app.use(cookieParser());

// Session
app.use(session(sessionConfig, app));

// //Passport initialization
// app.use(passport.initialize());
// app.use(passport.session());

// URL routing
app.use(router.routes());
app.use(router.allowedMethods());

// App listens on env PORT, or 3000 if PORT is undefined
app.listen(process.env.PORT || 3000);
