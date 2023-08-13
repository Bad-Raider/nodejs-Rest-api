import  jwt  from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    console.log('token', token);
    console.log('bearer', bearer);
    
    if (bearer !== "Bearer" || !token) {
        res.status(401)
        throw new Error("Not authorized");
    };
    
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        
        if (!user || !user.token || user.token !== token) {
            res.status(401)
            throw new Error("Not authorized");
        };

        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        res.json({message: "Not authorized"})
        next(error)
    }
};

export default authenticate;