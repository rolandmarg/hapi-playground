const { get, post } = require('./route');

module.exports = {
  name: 'meeting',
  version: '1.0.0',
  register: async function (server, options) {
    server.route(get);

    server.route(post);
  },
};
