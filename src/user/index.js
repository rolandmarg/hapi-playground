const { getProfile } = require('./route');

module.exports = {
  name: 'user',
  version: '1.0.0',
  async register(server) {
    server.route(getProfile);
  },
};
