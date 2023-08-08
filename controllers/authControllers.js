import ctrlWrapper from "../decorators/ctrlWrapper.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";

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

export default {
    register: ctrlWrapper(register),
        
};
