import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(8080),
  KEY: Joi.string()
    .optional()
    .description('Path to the .key file used in https'),
  CRT: Joi.string()
    .optional()
    .description('Path to the .crt file used in https'),
  HTTP2: Joi.boolean().default(true),
  DATABASE_URL: Joi.string().uri().required(),
  VIDEO_SCANPATH: Joi.string().required(),
  HASH_SALTROUNDS: Joi.number().default(13).min(8),
  JWT_SECRET: Joi.string().required().min(10),
  JWT_EXPIRATION: Joi.string()
    .default('1d')
    .description('Examples of allowed values at: https://github.com/vercel/ms'),
  DISCORD_ID: Joi.string().alphanum().optional(),
  DISCORD_SECRET: Joi.string().alphanum().optional(),
  DISCORD_CALLBACKURL: Joi.string().uri(),
  REQUEST_LOGGER_FORMAT: Joi.string()
    .default('dev')
    .description(
      'See morgan formats: https://github.com/expressjs/morgan#predefined-formats',
    ),
})
  .and('KEY', 'CRT')
  .and('DISCORD_ID', 'DISCORD_SECRET', 'DISCORD_CALLBACKURL');
