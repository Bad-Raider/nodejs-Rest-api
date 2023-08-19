import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import User from "../../models/user.js";

dotenv.config();

const { SECRET_KEY, } = process.env;


const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error("message: Email or password is wrong");
    };

    if (!user.verify) {
        res.status(401);
        throw new Error("message: Email is not verified");
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

export default ctrlWrapper(login);
