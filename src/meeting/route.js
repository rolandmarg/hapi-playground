const schema = require('./schema');
const { fetch, create } = require('./controller');

exports.get = {
  method: 'GET',
  path: '/meeting',
  handler: async (request, h) => {
    return fetch();
  },
  options: {
    tags: ['api'],
    auth: false,
    response: {
      schema: schema.meetings,
    },
  },
};

exports.post = {
  method: 'POST',
  path: '/meeting',
  handler: async (request, h) => {
    return create(request.payload);
  },
  options: {
    tags: ['api'],
    response: { schema: schema.meeting },
    validate: {
      payload: schema.createMeeting,
    },
  },
};
