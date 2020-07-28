import Hapi from '@hapi/hapi';

import Bell from '@hapi/bell';
import Cookie from '@hapi/cookie';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';

import HapiSwagger from 'hapi-swagger';

import GoogleAuth from './plugins/auth/google.js';
import LinkedinAuth from './plugins/auth/linkedin.js';
import SessionAuth from './plugins/auth/session.js';

import MeetingRoute from './plugins/routes/meeting.js';

export async function start() {
  try {
    const server = Hapi.server({ host: 'localhost', port: 3000 });

    const plugins = [
      Bell,
      Cookie,
      Inert,
      Vision,

      HapiSwagger,

      GoogleAuth,
      LinkedinAuth,
      SessionAuth,

      MeetingRoute,
    ];

    await server.register(plugins);
    await server.start();

    console.log('server up', server.info.uri);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
