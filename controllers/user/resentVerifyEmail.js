import dotenv from "dotenv";

import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import User from "../../models/user.js";
import { sendEmail } from "../../helpers/index.js";

dotenv.config();
const { BASE_URL } = process.env;


const resentVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({email: email});
    
    if (!email) {
        res.status(400);
        throw new Error("missing required field email");
    }

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    };

    if (user.verify) {
        res.status(400);
        throw new Error("Verification has already been passed");
    };

    const verifyEmail = {
        to: email,
        subject: "Hello, please confirm your email address!",
        html: `<a href="${BASE_URL}/api/users/verify/${user.verificationCode}" target="blank">Verify mail <a/>`,
    };
    
    await sendEmail(verifyEmail);

    res.status(200).json({
        message: "Email resent"
    });
};

export default ctrlWrapper(resentVerifyEmail);
