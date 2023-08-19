import { Router } from 'express';
import {addContactSchema, updateFavoriteSchema} from "../../schemas/index.js";
import {
  getAll,
  getById,
  deleteById,
  add,
  updateById,
  updateByIdFavorite,
} from "../../controllers/contacts/index.js";
import { validateBody, isEmptyBody, isValidId, authenticate } from '../../midleware/index.js';


const contactsRouter = Router();



contactsRouter.get('/', authenticate, getAll );

contactsRouter.get('/:id', authenticate, isValidId, getById)

contactsRouter.post('/', authenticate, isEmptyBody, validateBody(addContactSchema), add);

contactsRouter.delete('/:id', authenticate, isValidId, deleteById );

contactsRouter.put('/:id', authenticate, isValidId, isEmptyBody, validateBody(addContactSchema),  updateById);

contactsRouter.patch('/:id/favorite', authenticate, isValidId, isEmptyBody, validateBody(updateFavoriteSchema), updateByIdFavorite);

export default contactsRouter;
