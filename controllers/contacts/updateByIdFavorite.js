import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import Contact from "../../models/contacts.js";

const updateByIdFavorite = async (req, res, next) => {
    const id = req.params.id;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        res.status(404);
        throw new Error("message: missing field favorite");
    };
    res.json(result);
};

export default ctrlWrapper(updateByIdFavorite);