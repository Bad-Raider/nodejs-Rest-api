import Joi from 'joi';

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

export default updateFavoriteSchema