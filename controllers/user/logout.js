import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import User from "../../models/user.js";


const logout = async (req, res) => { 
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: ""});
    res.status(204).json({ message: "No Content" });
};

export default ctrlWrapper(logout);