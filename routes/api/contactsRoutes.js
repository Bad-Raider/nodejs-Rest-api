import { Router } from 'express';
import contactsActions from "../../models/contactcts.js";
import { HttpError } from "../../helpers/index.js";

const contactsRouter = Router();


const {
  listContacts,
  getContactById,
  // removeContact,
  // addContact,
  // updateContact,
} = contactsActions;


contactsRouter.get('/', async (req, res, next) => {
  try {
    res.json(await listContacts());
  } catch (error) {
    res.status(500).json({
      message: "Server error! Please, try again latter."
    });
  }
});

contactsRouter.get('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await getContactById(id);

    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);

  } catch (error) {
    next(error);
  }
})


// contactsRouter.post('/', async (req, res, next) => {

//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

export default contactsRouter
