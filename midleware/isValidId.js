import { isValidObjectId } from "mongoose";

const isValidId = (req, res, next) => {
    try {
        const id = req.params.id;

        if (!isValidObjectId(id)) {
            res.status(404)
            throw new Error(`message": "Not valid id: ${id}`);
        }
        next()
    } catch (error) {
        next(error);
    }
};

export default isValidId;
