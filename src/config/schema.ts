import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(8080),
  KEY: Joi.string(),
  CRT: Joi.string(),
  HTTP2: Joi.boolean().default(true),
  DATABASE_URL: Joi.string().uri(),
});
