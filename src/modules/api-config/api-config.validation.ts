import * as Joi from '@hapi/joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),
  REDIS_URL: Joi.string().required(),
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_PORT: Joi.number().required(),
  TYPEORM_LOGGING: Joi.bool().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_ENTITIES: Joi.string().required(),
  TYPEORM_MIGRATIONS: Joi.string().required(),
  TYPEORM_CONNECTION: Joi.string().required(),
  TYPEORM_MIGRATIONS_RUN: Joi.bool().required(),
  TYPEORM_MIGRATIONS_DIR: Joi.string().required(),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .required(),
});
