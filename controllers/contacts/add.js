import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import Contact from "../../models/contacts.js";


const add = async (req, res, next) => {
    const { _id: owner } = req.user;
    const newContact = await Contact.create({ ...req.body, owner });
    res.status(201).json(newContact);
};

export default ctrlWrapper(add);