import { Router } from 'express';
import validateBody from '../../helpers/midleware.js';
import schema from "../../Schema/index.js";
import contactsControllers from "../../controllers/contactsControllers.js";
const contactsRouter = Router();

const {
  getAll,
  getById,
  deleteById,
  add,
  updateById
} = contactsControllers;


contactsRouter.get('/', getAll );

contactsRouter.get('/:id', getById )

contactsRouter.post('/', validateBody(schema.addContactsSchema), add);

contactsRouter.delete('/:id', deleteById );

contactsRouter.put('/:id', validateBody(schema.updateContactsSchema), updateById);

export default contactsRouter;
