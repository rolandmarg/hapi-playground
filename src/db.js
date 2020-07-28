const { Pool } = require('pg');
const { userTable } = require('./models/user');
const { meetingTable } = require('./models/meeting');

const pool = new Pool();

exports.createTables = async () => {
  await pool.query(userTable);
  await pool.query(meetingTable);
};

exports.query = (text, params) => {
  return pool.query(text, params);
};
