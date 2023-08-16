import Joi from 'joi';


const verifySchema = Joi.object({
  email: Joi.string().required(),
});



export default verifySchema;
