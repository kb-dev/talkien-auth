const fetch = require('node-fetch');

const config = require('../config');

async function authenticate(code) {
	if (!config.clientId) {
		throw new Error('Missing client ID in config');
	}

	if (!config.clientSecret) {
		throw new Error('Missing client secret in config');
	}

	return fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},

		body: JSON.stringify({
			client_id: config.clientId,
			client_secret: config.clientSecret,
			code,
		}),
	}).then((response) => {
		if (Math.round(response.status / 100) > 2) {
			return response.text().then((err) => {
				throw new Error(err);
			});
		}

		return response.json();
	});
}

module.exports = {
	authenticate,
};
