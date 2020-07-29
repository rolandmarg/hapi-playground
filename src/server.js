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

exports.start = async (options) => {
  const server = Hapi.server(options);

  await server.register(plugins);
  await server.start();

  console.log('server up', server.info.uri);

  return server;
};

exports.init = async (plugins) => {
  const server = Hapi.server({
    debug: { log: ['*'], request: ['*'] },
  });

  await server.register(plugins);
  await server.initialize();

  return server;
};
