import model from '../../models/meeting.js';
import controller from '../../controllers/meeting.js';

export default {
  name: 'meetings-route',
  version: '0.0.1',
  register: async function (server, options) {
    server.route({
      method: 'GET',
      path: '/meetings',
      options: {
        tags: ['api'],
        response: {
          schema: model.arraySchema,
        },
      },
      handler: async (request, h) => {
        return controller.getAll();
      },
    });

    server.route({
      method: 'POST',
      path: '/meetings',
      options: {
        tags: ['api'],
        validate: {
          payload: model.postSchema,
        },
        response: { schema: model.schema },
      },
      handler: async (request, h) => {
        return controller.create(request.payload);
      },
    });
  },
};
