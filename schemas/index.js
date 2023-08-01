import Joi from 'joi';

const addContactsSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "any.required": `"title" must be exist`,
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
  ,
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
});

const updateContactsSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .messages({
      "any.required": `"title" must be exist`,
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
  favorite: Joi.boolean(),
});

const updateByIdFavorite = Joi.object({
  favorite: Joi.boolean().required(),
})

export default {
  addContactsSchema,
  updateContactsSchema,
  updateByIdFavorite,
};