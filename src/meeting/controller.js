const { query } = require('../db');

exports.create = async ({ title, start, end }) => {
  const res = await query(
    `INSERT INTO meetings(title, start, end) VALUES ($1, $2, $3)
      RETURNING *`,
    [title, start, end]
  );

  return res.rows[0];
};

exports.fetch = async () => {
  const res = await query('SELECT * FROM meetings');

  return res.rows;
};
