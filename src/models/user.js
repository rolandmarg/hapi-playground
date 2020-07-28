import Joi from 'joi';

export const schema = Joi.object({
  id: Joi.number().required(),
  email: Joi.string().email().required(),
  created_at: Joi.date().required(),
}).label('User');

export const table = `
CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at timestamptz DEFAULT current_timestamp
)`;

export default { schema, table };
