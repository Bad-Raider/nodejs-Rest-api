
const isEmptyBody = (req, res, next)=> {
    try {
    const {length} = Object.keys(req.body);
        if (!length) {
            res.status(400)
            throw new Error("fields must be required");
        }
        next()
    } catch (error) {
        next(error);
    }
}

export default isEmptyBody;


