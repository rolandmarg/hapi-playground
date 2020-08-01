const Hapi = require('@hapi/hapi');

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const authPlugins = require('./auth');
const userPlugin = require('./user');
const meetingPlugin = require('./meeting');

let server;

exports.startServer = async (options) => {
  server = Hapi.server(options);

  const plugins = [
    Inert,
    Vision,
    HapiSwagger,

    ...authPlugins,
    userPlugin,
    meetingPlugin,
  ];

  await server.register(plugins);
  await server.start();

  server.log('running on', server.info.uri);

  return server;
};

exports.startTestServer = async ({ routePrefix = '', plugins }) => {
  server = Hapi.server({
    debug: { log: ['*'] },
  });

  await server.register(plugins);
  await server.initialize();

  const injectPost = ({ url, payload } = {}) => {
    return server.inject({
      method: 'POST',
      url: routePrefix + (url || ''),
      payload,
    });
  };

  const injectGet = ({ url, payload } = {}) => {
    return server.inject({
      method: 'GET',
      url: routePrefix + (url || ''),
      payload,
    });
  };

  const stop = () => server.stop();

  return {
    get: injectGet,
    post: injectPost,
    stop,
  };
};
