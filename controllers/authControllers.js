import ctrlWrapper from "../decorators/ctrlWrapper.js";
import  User  from "../models/user.js";

const register = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
        res.status(409);
        throw new Error("message: Email in use");
    };
    
    const newUser = await User.create(req.body);
    
    res.status(201).json({
        email: newUser.email,
        password: newUser.password,
    })
};

export default {
    register: ctrlWrapper(register),
        
};
