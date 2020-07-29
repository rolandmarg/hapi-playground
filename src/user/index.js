const { getProfile } = require('./route');

module.exports = {
  name: 'user',
  version: '1.0.0',
  register: async function (server, options) {
    server.route(getProfile);
  },
};
