import gravatar from "gravatar";
import bcrypt from "bcrypt";
import  {nanoid}  from "nanoid";
import dotenv from "dotenv";

import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import User from "../../models/user.js";
import { sendEmail } from "../../helpers/index.js";

dotenv.config();
const { SECRET_KEY, BASE_URL } = process.env;



const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        res.status(409);
        throw new Error("message: Email in use");
    };
    
    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mp' });
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationCode = nanoid();

    console.log("verificationCode", verificationCode);

    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL: avatar,
        verificationCode,
    });

    const verifyEmail = {
        to: email,
        subject: "Hello, please confirm your email address!",
        html: `<a href="${BASE_URL}/api/users/verify/${verificationCode}" target="blank">Verify mail <a/>`,
    };
    
    await sendEmail(verifyEmail);

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    });
};


export default ctrlWrapper(register);