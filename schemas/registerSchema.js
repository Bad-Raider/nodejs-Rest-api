import Joi from 'joi';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const registerSchema = Joi.object({
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid('starter', 'pro', 'business').default('starter'),
  avatarURL: Joi.string(),
});



export default registerSchema;
