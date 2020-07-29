const { query } = require('../db');

exports.create = async ({ title, starts_at, ends_at }) => {
  const res = await query(
    `INSERT INTO meetings(title, starts_at, ends_at) VALUES ($1, $2, $3)
      RETURNING *`,
    [title, starts_at, ends_at]
  );

  return res.rows[0];
};

exports.fetch = async () => {
  const res = await query('SELECT * FROM meetings');

  return res.rows;
};
