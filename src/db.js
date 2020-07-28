import pg from 'pg';
import { table as userTable } from './models/user.js';
import { table as meetingTable } from './models/meeting.js';

const pool = new pg.Pool();

export async function createTables() {
  await pool.query(userTable);
  await pool.query(meetingTable);
}

export function query(text, params) {
  return pool.query(text, params);
}
