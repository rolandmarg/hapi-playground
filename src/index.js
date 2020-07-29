require('dotenv').config();
const { createTables } = require('./db');
const { start } = require('./server');

async function bootstrap() {
  await createTables();

  await start();
}

bootstrap();
