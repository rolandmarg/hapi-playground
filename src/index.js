require('dotenv').config();
const db = require('./db');
const { startServer } = require('./server');

async function bootstrap() {
  await db.createTables();

  await startServer({ host: 'localhost', port: 3000 });
}

bootstrap();
