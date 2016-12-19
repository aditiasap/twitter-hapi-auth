module.exports = [
	{
		method: 'GET',
		path: '/login',
		config: {
/*
			auth: {
				strategy: 'twitter',
				mode: 'try'
			},
*/
			auth: 'twitter',
			handler: function (request, reply) {
				if (!request.auth.isAuthenticated) {
					request.cookieAuth.clear();
					return reply('Login failed...');
				}
				request.cookieAuth.set({
					username: request.auth.credentials.profile.username
				});
				return reply.redirect('/private');
				//return reply(request.auth);
			}
/*		
			auth: 'twitter',
			handler: function (request, reply) {
				request.cookieAuth.set({
					username: request.auth.credentials.profile.username
				});
				//return reply(request.auth);
				return reply.redirect('/private');
				//return reply(request.auth).redirect('/private');
			}
*/		}
	},
	{
		method: 'GET',
		path: '/private',
		config: {
			//auth: 'session',
			//auth: false,
			auth: {
				strategy: 'session',
				mode: 'try'
			},
			handler: function (request, reply) {
				return reply(request.auth);
			}
		}
	}
];