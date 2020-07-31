const pg = require('pg');
const { userTable } = require('./user/schema');
const { meetingTable } = require('./meeting/schema');

const connectionString =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DB_URL
    : process.env.DB_URL;

const pool = new pg.Pool({ connectionString });

exports.createTables = async () => {
  await pool.query(userTable.createQuery);
  await pool.query(meetingTable.createQuery);
};

exports.query = (text, params) => {
  return pool.query(text, params);
};

exports.stop = () => {
  return pool.end();
};
