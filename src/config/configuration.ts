import * as Joi from 'joi';

export default () => ({
  isGlobal: true,
  envFilePath: '.env.' + process.env.NODE_ENV, // === 'dev' ? '.env.dev' : '.env.test',
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('dev', 'prod', 'test')
      .required(),
    DB_HOST: Joi.string(),
    DB_PORT: Joi.string(),
    DB_USERNAME: Joi.string(),
    DB_PASSWORD: Joi.string(),
    DB_NAME: Joi.string(),
    JWT_SECRET_KEY: Joi.string().required(),
    AWS_KEY: Joi.string().required(),
    AWS_SECRET: Joi.string().required(),
    ADMIN_SERET_KEY: Joi.string().required(),
  }),
});
