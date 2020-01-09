const Koa = require('koa');
const helmet = require('koa-helmet');

const config = require('../config');
const Github = require('../tools/github');

const server = new Koa();

server.use(helmet());

server.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', config.appServer);

	next();
});

server.use(async (ctx) => {
	if (ctx.method === 'GET' && ctx.path === '/auth') {
		/* GET /auth?code=<value> */
		ctx.assert(ctx.query.code, 400, 'Missing code parameter');

		const token = await Github.authenticate(ctx.query.code);

		ctx.body = {
			data: token,
		};
	} else if (ctx.method === 'GET' && ctx.path === '/clientId') {
		/* GET /clientId */
		ctx.body = {
			data: config.clientId,
		};
	} else {
		ctx.throw(404, 'Not found');
	}
});

server.listen(config.port);

console.log(`Server ready on port ${config.port}`);
