const fetch = require('node-fetch');

const config = require('../config');

async function authenticate(code) {
	if (!config.clientId) {
		throw new Error('Missing client ID in config');
	}

	if (!config.clientSecret) {
		throw new Error('Missing client secret in config');
	}

	return false;
}

module.exports = {
	authenticate,
};
