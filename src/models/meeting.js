import Joi from 'joi';

export const schema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().min(3).max(255).required(),
  starts_at: Joi.date().required(),
  ends_at: Joi.date().required(),
}).label('Meeting');

export const postSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  starts_at: Joi.date().required(),
  ends_at: Joi.date().required(),
}).label('postMeeting');

export const arraySchema = Joi.array()
  .items(schema)
  .label('Meetings');

export const table = `
CREATE TABLE IF NOT EXISTS meetings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL
)`;

export default { schema, postSchema, arraySchema, table };
