const { logout, googleAuth, linkedinAuth } = require('./route');

exports.linkedin = {
  name: 'linkedin-auth',
  version: '1.0.0',
  dependencies: ['@hapi/bell', 'cookie-auth'],
  register: async function (server, options) {
    server.auth.strategy('linkedin', 'bell', {
      provider: 'linkedin',
      password: process.env.COOKIE_SECRET,
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      isSecure: process.env.NODE_ENV === 'production',
    });

    server.route(linkedinAuth);
  },
};

exports.google = {
  name: 'google-auth',
  version: '1.0.0',
  dependencies: ['@hapi/bell', 'cookie-auth'],
  register: async function (server, options) {
    server.auth.strategy('google', 'bell', {
      provider: 'google',
      password: process.env.COOKIE_SECRET,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      isSecure: process.env.NODE_ENV === 'production',
    });

    server.route(googleAuth);
  },
};

exports.cookie = {
  name: 'cookie-auth',
  version: '1.0.0',
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

    server.route(logout);
  },
};
