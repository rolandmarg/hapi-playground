const Glue = require('@hapi/glue');

const Bell = require('@hapi/bell');
const Cookie = require('@hapi/cookie');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');

const HapiSwagger = require('hapi-swagger');

const GoogleAuth = require('./plugins/auth/google');
const LinkedinAuth = require('./plugins/auth/linkedin');
const SessionAuth = require('./plugins/auth/session');

const MeetingRoute = require('./plugins/routes/meeting');

const manifest = {
  server: {
    host: 'localhost',
    port: 3000,
  },
  register: {
    plugins: [
      Bell,
      Cookie,
      Inert,
      Vision,
      HapiSwagger,
      GoogleAuth,
      LinkedinAuth,
      SessionAuth,
      MeetingRoute,
    ],
  },
};

async function startServer() {
  try {
    const server = await Glue.compose(manifest);

    await server.start();

    console.log('server up', server.info.uri);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

module.exports = startServer;
