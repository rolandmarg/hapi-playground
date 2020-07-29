const { query } = require('../db');

exports.create = async ({ email }) => {
  const res = await query(
    `INSERT INTO users(email) VALUES ($1)
      ON CONFLICT (email) DO NOTHING
      RETURNING *`,
    [email]
  );

  return res.rows[0];
};

exports.fetchUserByEmail = async ({ email }) => {
  const res = await query('SELECT * FROM users where email = $1', [
    email,
  ]);

  return res.rows[0];
};
