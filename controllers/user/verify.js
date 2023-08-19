import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import User from "../../models/user.js";


const verify = async (req, res) => {
    const { verificationCode } = req.params;
    const user = await User.findOne({ verificationCode });
    if (!user) {
        res.status(404);
        throw new Error("message: User is not found");
    };
    await User.findByIdAndUpdate(
        user._id,
        {
            verify: true,
            verificationCode: ""
        });
    
    res.status(200).json({
        message: "Verification successful"
    });
};

export default ctrlWrapper(verify);

