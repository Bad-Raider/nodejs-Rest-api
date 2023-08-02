import { Router } from 'express';
import {addContactSchema, updateFavoriteSchema} from "../../schemas/index.js";
import contactsControllers from "../../controllers/contactsControllers.js";
import { validateBody, isEmptyBody, isValidId } from '../../midleware/index.js';


const contactsRouter = Router();

const {
  getAll,
  getById,
  deleteById,
  add,
  updateById,
  updateByIdFavorite,
} = contactsControllers;


contactsRouter.get('/', getAll );

contactsRouter.get('/:id', isValidId, getById)

contactsRouter.post('/', isEmptyBody, validateBody(addContactSchema), add);

contactsRouter.delete('/:id', isValidId, deleteById );

contactsRouter.put('/:id', isValidId, isEmptyBody, validateBody(addContactSchema),  updateById);

contactsRouter.patch('/:id/favorite', isValidId, isEmptyBody, validateBody(updateFavoriteSchema), updateByIdFavorite);

export default contactsRouter;
