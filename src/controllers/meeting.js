const db = require('../db');

exports.createMeeting = async ({ title, starts_at, ends_at }) => {
  const res = await db.query(
    `INSERT INTO meetings(title, starts_at, ends_at) VALUES ($1, $2, $3)
      RETURNING *`,
    [title, starts_at, ends_at]
  );

  return res.rows[0];
};

exports.getAllMeetings = async () => {
  const res = await db.query('SELECT * FROM meetings');

  return res.rows;
};
