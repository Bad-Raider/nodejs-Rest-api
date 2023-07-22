import { Router, json } from 'express';
import Joi from 'joi';
import contactsActions from "../../models/contactcts.js";
import { HttpError } from "../../helpers/index.js";

const contactsRouter = Router();


const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = contactsActions;


const movieAddSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
    "any.required": `"title" must be exist`,
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),  
});


contactsRouter.get('/', async (req, res, next) => {
  try {
    res.json(await listContacts());
  } catch (error) {
    next(error);
  }
});

contactsRouter.get('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
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
    const { error} = movieAddSchema.validate(bodyContact);
    if (error) {
        throw HttpError(400, "message: missing required name field");
    };

    const newContact = await addContact(bodyContact);
    res.status(201).json(newContact);

  } catch (error) {
    next(error)
  }
});

contactsRouter.delete('/:contactId', async (req, res, next) => {
  
  try {
    const id = req.params.contactId;
    const result = await removeContact(id);

    if (!result) {
      throw HttpError(404, "")
    }

    res.json({ message: "contact deleted" })

  } catch (error) {
    next(error)
  }
  
});

contactsRouter.put('/:contactId', async (req, res, next) => {
  
  const id = req.params.contactId;
  const { name, phone, email } = req.body;
  const bodyContact = {
    name,
    phone,
    email,
  };
  const { error} = movieAddSchema.validate(bodyContact);
    if (error) {
        throw HttpError(400, "message: missing required name field");
  };

  const data = await updateContact(id, bodyContact);
  res.status()


  res.json({ message: 'template message' })
});

export default contactsRouter
