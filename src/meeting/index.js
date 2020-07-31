const { get, post } = require('./route');

module.exports = {
  name: 'meeting',
  version: '1.0.0',
  async register(server) {
    server.route(get);

    server.route(post);
  },
};
