import Boom from '@hapi/boom';
import { create } from '../../controllers/user.js';

export default {
  name: 'linkedin-auth',
  version: '0.0.1',
  dependencies: ['@hapi/bell', 'session-cookie'],
  register: async function (server, options) {
    server.auth.strategy('linkedin', 'bell', {
      provider: 'linkedin',
      password: process.env.COOKIE_SECRET,
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      isSecure: process.env.NODE_ENV === 'production',
    });

    server.route({
      method: ['GET', 'POST'],
      path: '/auth/linkedin',
      options: {
        tags: ['api', 'auth'],
        auth: {
          mode: 'try',
          strategy: 'linkedin',
        },
      },
      handler: function (request, h) {
        request.cookieAuth.clear();

        if (!request.auth.isAuthenticated) {
          return Boom.unauthorized('Linkedin authentication failed');
        }

        const credentials = request.auth.credentials;
        const { name } = request.auth.credentials.profile;

        const user = {
          name: `${name.first} ${name.last}`,
          email: credentials.profile.email,
          provider: credentials.provider,
          token: credentials.token,
          expiresIn: credentials.expiresIn,
        };

        request.cookieAuth.set(user);

        create(user);

        return h.redirect('/profile');
      },
    });
  },
};
