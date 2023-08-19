import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import User from "../../models/user.js";

const updateBySubscription = async (req, res, next) => {
    const { _id } = req.user;
    const newSubscription = req.body.subscription;
    const result = await User.findByIdAndUpdate(_id, { subscription: newSubscription }, { new: true });
    
    if (!result) {
        res.status(404);
        throw new Error("message: missing field favorite");
    };

    res.json(result);
};

export default ctrlWrapper(updateBySubscription);