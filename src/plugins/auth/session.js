const Joi = require('joi');

const sessionSchema = Joi.object({
  name: Joi.string().max(255).required(),
  email: Joi.string().email().required(),
  provider: Joi.string().max(64).required(),
  token: Joi.string().max(255).required(),
  expiresIn: Joi.number().required(),
}).label('Session');

exports.sessionSchema = sessionSchema;

exports.plugin = {
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
        response: { schema: sessionSchema },
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
