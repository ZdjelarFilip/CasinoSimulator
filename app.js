import Koa from 'koa';
import bodyParser from 'koa-body';
import cookie from 'koa-cookie';

var app = new Koa();

app.use(bodyParser());
app.use(cookie());

app.use(async (ctx, next) => {
	// the parsed body will store in ctx.request.body
	// if nothing was parsed, body will be an empty object {}
	ctx.body = ctx.request.body
	//await next();
});



app.listen(process.env.PORT || 3000);
