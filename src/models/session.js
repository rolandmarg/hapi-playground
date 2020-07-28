import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string().max(255).required(),
  email: Joi.string().email().required(),
  provider: Joi.string().max(64).required(),
  token: Joi.string().max(255).required(),
  expiresIn: Joi.number().required(),
}).label('Session');
