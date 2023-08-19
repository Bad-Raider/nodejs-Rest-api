import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import Contact from "../../models/contacts.js";

const getById = async (req, res, next) => {
        const id = req.params.id;
        const result = await Contact.findById(id);
        if (!result) {
            res.status(404)
            throw new Error(`message": "Not found`)
        }
        res.json(result);
};

export default ctrlWrapper(getById);