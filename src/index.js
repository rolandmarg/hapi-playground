require('dotenv').config();
const db = require('./db');
const server = require('./server');

async function bootstrap() {
  await db.init({ connectionString: process.env.DATABASE_URL });
  await db.createTables();

  await server.start({ host: 'localhost', port: 3000 });
}

bootstrap();
