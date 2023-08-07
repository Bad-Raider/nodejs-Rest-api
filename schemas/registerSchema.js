import Joi from 'joi';

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid('starter', 'pro', 'business').default('starter').required(),
});



export default registerSchema;
