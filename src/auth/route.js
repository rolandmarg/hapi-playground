const Boom = require('@hapi/boom');
const { session } = require('./schema');

exports.getCredentials = {
  method: 'GET',
  path: '/auth/credentials',
  options: {
    tags: ['api'],
    response: { schema: session },
  },
  handler: async (request) => request.auth.credentials,
};

exports.logout = {
  method: 'POST',
  path: '/auth/logout',
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
};

exports.googleAuth = {
  method: ['GET', 'POST'],
  path: '/auth/google',
  options: {
    tags: ['api', 'auth'],
    auth: {
      mode: 'try',
      strategy: 'google',
    },
  },
  handler(request, h) {
    request.cookieAuth.clear();

    if (!request.auth.isAuthenticated) {
      return Boom.unauthorized('Google authentication failed');
    }

    const { credentials } = request.auth;

    const user = {
      name: credentials.profile.displayName,
      email: credentials.profile.email,
      provider: credentials.provider,
      token: credentials.token,
      expiresIn: credentials.expiresIn,
    };

    request.cookieAuth.set(user);

    return h.redirect('/profile');
  },
};

exports.linkedinAuth = {
  method: ['GET', 'POST'],
  path: '/auth/linkedin',
  options: {
    tags: ['api', 'auth'],
    auth: {
      mode: 'try',
      strategy: 'linkedin',
    },
  },
  handler(request, h) {
    request.cookieAuth.clear();

    if (!request.auth.isAuthenticated) {
      return Boom.unauthorized('Linkedin authentication failed');
    }

    const { credentials } = request.auth;
    const { name } = request.auth.credentials.profile;

    const user = {
      name: `${name.first} ${name.last}`,
      email: credentials.profile.email,
      provider: credentials.provider,
      token: credentials.token,
      expiresIn: credentials.expiresIn,
    };

    request.cookieAuth.set(user);

    return h.redirect('/profile');
  },
};
