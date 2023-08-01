import ctrlWrapper from "../decorators/ctrlWraper.js";
import Contact from "../models/contacts.js";


const getAll = async (req, res, next) => {
        res.json(await Contact.find());
};

const getById = async (req, res, next) => {
        const id = req.params.id;
        const result = await Contact.findById(id);
        if (!result) {
            res.status(404)
            throw new Error(`message": "Not found`)
        }
        res.json(result);
};

const add = async (req, res, next) => {
        const newContact = await Contact.create(req.body);
        res.status(201).json(newContact);
};

// const deleteById = async (req, res, next) => {
//         const id = req.params.id;
//         const result = await removeContact(id);
//         if (!result) {
//             res.status(404);
//             throw new Error("message: Not found");
//         }
//         res.json({ message: "contact deleted" })
// };

const updateById = async (req, res, next) => {
        const id = req.params.id;
        const result = await Contact.findByIdAndUpdate(id, req.body);
        if (!result) {
                res.status(404);
                throw new Error("message: Not found");
        };
        res.json(result);
};

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
//     deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById),
};