import Joi from 'joi';

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').default('starter'),
})

export default updateSubscriptionSchema;

