import Joi from 'joi';

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid('starter', 'pro', 'business').default('starter')
});



export default registerSchema;
