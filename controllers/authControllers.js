import ctrlWrapper from "../decorators/ctrlWrapper.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// const { SECRET_KEY } = process.env;
const SECRETKEY = process.env.SECRET_KEY;

console.log('SECRET_KEY----', SECRETKEY);

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
        res.status(409);
        throw new Error("message: Email in use");
    };
    
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ ...req.body, password: hashPassword });
    
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user ) {
        res.status(401);
        throw new Error("message: Email or password is wrong");
    };
    console.log('password', password);
    console.log("user.password", user.password);

    const passpordCompare = await bcrypt.compare(password, user.password);

    if (!passpordCompare) {
        res.status(401);
        throw new Error("message: Email or password is wrong");
    };

    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    res.json(
        { token }
    );
};


export default {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
};
