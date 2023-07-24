import { Router, json } from 'express';
import contactsActions from "../../models/contactcts.js";
import { HttpError } from "../../helpers/index.js";
import schema from "../../Schema/index.js";
const contactsRouter = Router();


const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = contactsActions;


contactsRouter.get('/', async (req, res, next) => {
  try {
    res.json(await listContacts());
  } catch (error) {
    next(error);
  }
});

contactsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getContactById(id);

    if (!result) {
      throw HttpError(404, `message": "Not found`);
    }

    res.json(result);

  } catch (error) {
    next(error);
  }
})

contactsRouter.post('/', async (req, res, next) => {
  
  try {
    const { name, phone, email } = req.body;
    const bodyContact = {
      name,
      phone,
      email,
    }
    const { error} = schema.addContactsSchema.validate(bodyContact);
    if (error) {
        throw HttpError(400, "message: missing required name field");
    };

    const newContact = await addContact(bodyContact);
    res.status(201).json(newContact);

  } catch (error) {
    next(error)
  }
});

contactsRouter.delete('/:id', async (req, res, next) => {
  
  try {
    const id = req.params.id;
    const result = await removeContact(id);

    if (!result) {
      throw HttpError(404, "message: Not found")
    }

    res.json({ message: "contact deleted" })

  } catch (error) {
    next(error)
  }
  
});

contactsRouter.put('/:id', async (req, res, next) => {
  
  try {
    const { error } = schema.updateContactsSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "message: missing required name field");
    };

    const id = req.params.id;
    const result = await updateContact(id, req.body);
    res.json(result);

  } catch (error) {
    next(error)
  }
});

export default contactsRouter
