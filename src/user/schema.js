const Joi = require('joi');

exports.user = Joi.object({
  id: Joi.number().required(),
  email: Joi.string().email().required(),
  created_at: Joi.date().required(),
}).label('User');

exports.userTable = {
  createQuery: `
    CREATE TABLE IF NOT EXISTS users (
      id serial PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at timestamptz DEFAULT current_timestamp
    )`,
  truncateQuery: `TRUNCATE TABLE users`,
};