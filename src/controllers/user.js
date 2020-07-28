const db = require('../db');

exports.createUser = async ({ email }) => {
  const res = await db.query(
    `INSERT INTO users(email) VALUES ($1)
      ON CONFLICT (email) DO NOTHING
      RETURNING *`,
    [email]
  );

  return res.rows[0];
};

exports.getUser = async ({ email }) => {
  const res = await db.query('SELECT * FROM users where email = $1', [
    email,
  ]);

  return res.rows[0];
};
