const pg = require('pg');
const { userTable } = require('./user/schema');
const { meetingTable } = require('./meeting/schema');

const pool = new pg.Pool();

exports.createTables = async () => {
  await pool.query(userTable);
  await pool.query(meetingTable);
};

exports.query = (text, params) => {
  return pool.query(text, params);
};
