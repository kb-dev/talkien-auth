const fetch = require('node-fetch');

const config = require('../config');

async function authenticate(code) {
	if (!config.clientId) {
		throw new Error('Missing client ID in config');
	}

	if (!config.clientSecret) {
		throw new Error('Missing client secret in config');
	}

	//return false;

	console.log(JSON.stringify({ client_id: config.clientId, client_secret: config.clientSecret, code}))

	return fetch(`https://github.com/login/oauth/access_token`,{
		method: 'POST',
		headers: {

		Accept: 'application/json',
	},

		body: JSON.stringify({ client_id: config.clientId, client_secret: config.clientSecret, code}),
	})
	.then((response)=> {
		/*return response.text((t) => {
			return response.json()
		})*/

		return response.json()
	})
	.catch((err) => console.error(err));
}

module.exports = {
	authenticate,
};

console.log(authenticate);