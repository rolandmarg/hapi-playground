const Hapi = require('@hapi/hapi');
const Bell = require('@hapi/bell');
const Cookie = require('@hapi/cookie');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const authPlugins = require('./auth/plugin');
const userPlugin = require('./user/plugin');
const meetingPlugin = require('./meeting/plugin');

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

const server = Hapi.server({ host: 'localhost', port: 3000 });

exports.start = async () => {
  await server.register(plugins);
  await server.start();

  console.log('server up', server.info.uri);

  return server;
};

exports.init = async () => {
  await server.register(plugins);
  await server.initialize();

  return server;
};
