import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import Contact from "../../models/contacts.js";


const deleteById = async (req, res, next) => {
    const id = req.params.id;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
        res.status(404);
        throw new Error("message: Not found");
    }
    res.json({ message: "contact deleted" })
};

export default ctrlWrapper(deleteById);
