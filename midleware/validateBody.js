const validateBody = (schema) => {
    try {
        const func = (req, res, next) => {
            const { error } = schema.validate(req.body);
            if (error) {
                res.status(400)
                throw new Error(`message: validation error`)
            };
            next();
        };
        return func;
    } catch (error) {
        next(error);
    }
};

export default validateBody;