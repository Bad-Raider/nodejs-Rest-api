import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Contact from "../models/contacts.js";


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
        const { _id: owner } = req.user;
        const newContact = await Contact.create({...req.body, owner});
        res.status(201).json(newContact);
};

const deleteById = async (req, res, next) => {
        const id = req.params.id;
        const result = await Contact.findByIdAndDelete(id);
        if (!result) {
            res.status(404);
            throw new Error("message: Not found");
        }
        res.json({ message: "contact deleted" })
};

const updateById = async (req, res, next) => {
        const id = req.params.id;
        const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
        if (!result) {
                res.status(404);
                throw new Error("message: Not found");
        };
        res.json(result);
};

const updateByIdFavorite = async (req, res, next) => {
        const id = req.params.id;
        const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
                res.status(404);
                throw new Error("message: missing field favorite");
        };
        res.json(result);
};

export default {
        getAll: ctrlWrapper(getAll),
        getById: ctrlWrapper(getById),
        add: ctrlWrapper(add),
        deleteById: ctrlWrapper(deleteById),
        updateById: ctrlWrapper(updateById),
        updateByIdFavorite: ctrlWrapper(updateByIdFavorite),
};