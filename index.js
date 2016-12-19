const Hapi = require('hapi');
const Cookie = require('hapi-auth-cookie');
const Bell = require('bell');
const Blipp = require('blipp');
const routes = require('./routes');

const server = new Hapi.Server();

server.connection({
	host: '127.0.0.1',
	port: 1337
});

server.register(
	[
		Cookie,
		Bell,
		{
			register: Blipp,
			options: {
				showAuth: true
			}
		}
	], (err) => {
		server.auth.strategy('session', 'cookie', {
			cookie: 'example',
			password: 'secret.0123456789.0123456789.012',
			isSecure: false,
			redirectTo: '/login',
			redirectOnTry: false
		});
		// Acquire clientId and clientSecret by creating a twitter application
		// at https://apps.twitter.com/app/new
		server.auth.strategy('twitter', 'bell', {
				provider: 'twitter',
				password: 'cookie_encryption_password_secure',
				clientId: 'Y4kdR2b1kjw5AiiJCmhIR1hCU',
				clientSecret: 'Z2WFnuUq1YQ49n5pJZUwXC24BhpheHunKGEoomGOoDgP3RYNdV',
				isSecure: false
			}
		);
		server.route(routes);
		server.start(() => {});
	}
);