const Joi = require('joi');

const meeting = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().min(3).max(255).required(),
  starts_at: Joi.date().iso().min('1-1-2020').max('1-1-2030').required(),
  ends_at: Joi.date()
    .iso()
    .min(Joi.ref('starts_at'))
    .max('1-1-2030')
    .required(),
}).label('Meeting');

exports.meeting = meeting;

exports.createMeeting = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  starts_at: Joi.date().iso().min('1-1-2020').max('1-1-2030').required(),
  ends_at: Joi.date()
    .iso()
    .min(Joi.ref('starts_at'))
    .max('1-1-2030')
    .required(),
}).label('postMeeting');

exports.meetings = Joi.array().items(meeting).label('Meetings');

exports.meetingTable = {
  createQuery: `
    CREATE TABLE IF NOT EXISTS meetings (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      starts_at TIMESTAMPTZ NOT NULL,
      ends_at TIMESTAMPTZ NOT NULL
    )`,
  truncateQuery: 'TRUNCATE TABLE meetings',
  dropQuery: 'DROP TABLE meetings',
};
