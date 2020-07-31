const { session } = require('../auth/schema');

exports.getProfile = {
  method: 'GET',
  path: '/profile',
  options: {
    tags: ['api'],
    response: { schema: session },
  },
  handler: async (request) => request.auth.credentials,
};
