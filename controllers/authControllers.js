import ctrlWrapper from "../decorators/ctrlWrapper.js";
import User from "../models/user.js";

const register = (req, res, next) => {
    
};

export default {
    register: ctrlWrapper(register),
        
}