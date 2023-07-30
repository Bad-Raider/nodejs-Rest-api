import contactsActions from "../models/contactcts.js";
import ctrlWrapper from "../decorators/ctrlWraper.js";

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = contactsActions;

const getAll = async (req, res, next) => {
        res.json(await listContacts());
};

const getById = async (req, res, next) => {
        const id = req.params.id;
        const result = await getContactById(id);
        if (!result) {
            res.status(404)
            throw new Error(`message": "Not found`)
        }
        res.json(result);
};

const add = async (req, res, next) => {
        const newContact = await addContact(req.body);
        res.status(201).json(newContact);
};

const deleteById = async (req, res, next) => {
        const id = req.params.id;
        const result = await removeContact(id);
        if (!result) {
            res.status(404);
            throw new Error("message: Not found");
        }
        res.json({ message: "contact deleted" })
};

const updateById = async (req, res, next) => {
        const id = req.params.id;
        const result = await updateContact(id, req.body);
        res.json(result);
};

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById),
};