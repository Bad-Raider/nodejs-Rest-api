import ctrlWrapper from "../decorators/ctrlWrapper.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { SECRET_KEY } = process.env;


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
    const passpordCompare = await bcrypt.compare(password, user.password);

    if (!passpordCompare) {
        res.status(401);
        throw new Error("message: Email or password is wrong");
    };

    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });

    await User.findByIdAndUpdate(user._id, { token }); 

    res.status(200).json(
        {
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
            }
        }
    );
};

const current = async (req, res) => { 
    const { email, subscription } = req.user;
    res.json({email, subscription});
};

const logout = async (req, res) => { 
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: ""});
    res.status(204).json({ message: "No Content" });
};

export default {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    current: ctrlWrapper(current),
    logout: ctrlWrapper(logout),
};
