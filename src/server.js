const Hapi = require('@hapi/hapi');
const Bell = require('@hapi/bell');
const Cookie = require('@hapi/cookie');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const authPlugins = require('./auth');
const userPlugin = require('./user');
const meetingPlugin = require('./meeting');

const plugins = [
  Bell,
  Cookie,
  Inert,
  Vision,
  HapiSwagger,

  authPlugins.cookie,
  authPlugins.google,
  authPlugins.linkedin,
  userPlugin,
  meetingPlugin,
];

let server;

exports.startServer = async (options) => {
  server = Hapi.server(options);

  await server.register(plugins);
  await server.start();

  console.log('server up', server.info.uri);

  return server;
};

exports.startTestServer = async ({ routePrefix = '', plugins }) => {
  server = Hapi.server({
    debug: { log: ['*'], request: ['*'] },
  });

  await server.register(plugins);
  await server.initialize();

  const injectPost = (payload, route = '') => {
    return server.inject({
      method: 'POST',
      url: routePrefix + route,
      payload,
    });
  };

  const injectGet = (route = '') => {
    return server.inject({ method: 'GET', url: routePrefix + route });
  };

  const stop = () => {
    return server.stop();
  };

  return {
    get: injectGet,
    post: injectPost,
    stop,
  };
};
