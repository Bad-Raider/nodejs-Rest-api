import Joi from 'joi';

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});



export default loginSchema;
