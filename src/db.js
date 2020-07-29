const pg = require('pg');
const { userTable } = require('./user/schema');
const { meetingTable } = require('./meeting/schema');

let pool;

exports.init = async (options) => {
  pool = new pg.Pool(options);
  return pool;
};

exports.createTables = async () => {
  await pool.query(userTable);
  await pool.query(meetingTable);
};

exports.query = (text, params) => {
  return pool.query(text, params);
};
