const Joi = require('joi');
const { meetingSchema, postMeetingSchema } = require('../../models/meeting');
const { getAllMeetings, createMeeting } = require('../../controllers/meeting');

exports.plugin = {
  name: 'meetings-route',
  version: '0.0.1',
  register: async function (server, options) {
    server.route({
      method: 'GET',
      path: '/meetings',
      options: {
        tags: ['api'],
        response: {
          schema: Joi.array().items(meetingSchema).label('Meetings'),
        },
      },
      handler: async (request, h) => {
        return getAllMeetings();
      },
    });

    server.route({
      method: 'POST',
      path: '/meetings',
      options: {
        tags: ['api'],
        validate: {
          payload: postMeetingSchema,
        },
        response: { schema: meetingSchema },
      },
      handler: async (request, h) => {
        return createMeeting(request.payload);
      },
    });
  },
};
