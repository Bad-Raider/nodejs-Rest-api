import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import Contact from "../../models/contacts.js";

const getAll = async (req, res, next) => {

        const { page = 1, limit = 20 } = req.query;
        const skip = (page - 1) * limit;
        const { _id: owner } = req.user;
        const result = await Contact
                .find({ owner })
                .skip(skip)
                .limit(limit)
                .populate("owner", "_id email"); 
        
        res.json(result);
};

export default ctrlWrapper(getAll);
