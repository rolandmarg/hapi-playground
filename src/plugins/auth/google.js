const Boom = require('@hapi/boom');
const { createUser } = require('../../controllers/user');

exports.plugin = {
  name: 'google-auth',
  version: '0.0.1',
  dependencies: ['@hapi/bell', 'session-cookie'],
  register: async function (server, options) {
    server.auth.strategy('google', 'bell', {
      provider: 'google',
      password: process.env.COOKIE_SECRET,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      isSecure: process.env.NODE_ENV === 'production',
    });

    server.route({
      method: ['GET', 'POST'],
      path: '/auth/google',
      options: {
        tags: ['api', 'auth'],
        auth: {
          mode: 'try',
          strategy: 'google',
        },
      },
      handler: function (request, h) {
        request.cookieAuth.clear();

        if (!request.auth.isAuthenticated) {
          return Boom.unauthorized('Google authentication failed');
        }

        const credentials = request.auth.credentials;

        const session = {
          name: credentials.profile.displayName,
          email: credentials.profile.email,
          provider: credentials.provider,
          token: credentials.token,
          expiresIn: credentials.expiresIn,
        };

        request.cookieAuth.set(session);

        createUser(session);

        return h.redirect('/profile');
      },
    });
  },
};
