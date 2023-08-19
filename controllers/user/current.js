import ctrlWrapper from "../../decorators/ctrlWrapper.js";


const current = async (req, res) => { 
    const { email, subscription } = req.user;
    res.json({email, subscription});
};

export default ctrlWrapper(current);