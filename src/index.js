import 'dotenv/config.js';
import { createTables } from './db.js';
import { start } from './server.js';

async function bootstrap() {
  await createTables();

  await start();
}

bootstrap();
