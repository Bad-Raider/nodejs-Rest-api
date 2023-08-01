import { Router } from 'express';
import schema from "../../schemas/index.js";
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

contactsRouter.post('/', isEmptyBody, validateBody(schema.addContactsSchema), add);

contactsRouter.delete('/:id', isValidId, deleteById );

contactsRouter.put('/:id', isValidId, isEmptyBody, validateBody(schema.updateContactsSchema), updateById);

contactsRouter.patch('/:id/favorite', isValidId, isEmptyBody,  updateByIdFavorite);

export default contactsRouter;
