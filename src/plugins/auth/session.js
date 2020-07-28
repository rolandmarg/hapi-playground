import { schema } from '../../models/session.js';

export default {
  name: 'session-cookie',
  version: '0.0.1',
  dependencies: ['@hapi/cookie'],
  register: async function (server, options) {
    server.auth.strategy('session', 'cookie', {
      cookie: {
        password: process.env.COOKIE_SECRET,
        isSecure: process.env.NODE_ENV === 'production',
        ttl: process.env.COOKIE_TTL,
        path: '/',
        clearInvalid: true,
      },
      keepAlive: true,
    });

    server.auth.default('session');

    server.route({
      method: 'GET',
      path: '/profile',
      options: {
        tags: ['api'],
        response: { schema },
      },
      handler: async (request, h) => {
        return request.auth.credentials;
      },
    });

    server.route({
      method: 'POST',
      path: '/logout',
      options: {
        tags: ['api'],
        auth: {
          mode: 'try',
        },
      },
      handler: async (request, h) => {
        request.cookieAuth.clear();

        return h.redirect('/');
      },
    });
  },
};
