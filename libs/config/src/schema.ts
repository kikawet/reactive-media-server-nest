import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(8080),
  KEY: Joi.string().optional(),
  CRT: Joi.string().optional(),
  HTTP2: Joi.boolean().default(true),
  DATABASE_URL: Joi.string().uri().required(),
  VIDEO_SCANPATH: Joi.string().required(),
  HASH_SALTROUNDS: Joi.number().default(13),
});
