import { query } from '../db.js';

export async function create({ title, starts_at, ends_at }) {
  const res = await query(
    `INSERT INTO meetings(title, starts_at, ends_at) VALUES ($1, $2, $3)
      RETURNING *`,
    [title, starts_at, ends_at]
  );

  return res.rows[0];
}

export async function getAll() {
  const res = await query('SELECT * FROM meetings');

  return res.rows;
}

export default { create, getAll };
