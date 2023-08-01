import { Router } from 'express';
import validateBody from '../../helpers/midleware.js';
import schema from "../../Schema/index.js";
import contactsControllers from "../../controllers/contactsControllers.js";
import isValidId from '../../helpers/isValidById.js';

const contactsRouter = Router();

const {
getAll,
  getById,
  // deleteById,
  add,
  updateById
} = contactsControllers;


contactsRouter.get('/', getAll );

contactsRouter.get('/:id', isValidId, getById )

// validateBody(schema.addContactsSchema)
contactsRouter.post('/', add);

// contactsRouter.delete('/:id', isValidId, deleteById );

// 
contactsRouter.put('/:id', isValidId, validateBody(schema.updateContactsSchema), updateById);

export default contactsRouter;
