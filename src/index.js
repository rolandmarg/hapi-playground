require('dotenv').config();
const startServer = require('./server');
const db = require('./db');

async function bootstrap() {
  await db.createTables();

  await startServer();
}

bootstrap();
