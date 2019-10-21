const Koa = require('koa');
const helmet = require('koa-helmet');

const config = require('../config');
const Github = require('../tools/github');

const server = new Koa();

server.use(helmet());

server.use(async (ctx) => {
	/* /auth?code=<value> */
	if (ctx.path === '/auth') {
		ctx.assert(ctx.query.code, 400, 'Missing code parameter');

		ctx.body = {
			res: await Github.authenticate()
		};
	} else {
		ctx.throw(404, 'Not found');
	}
});

server.listen(config.port);

console.log(`Server ready on port ${config.port}`);
