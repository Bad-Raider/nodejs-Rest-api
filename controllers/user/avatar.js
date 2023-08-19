import path from "path";
import fs from "fs/promises";

import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import User from "../../models/user.js";

const avatar = async (req, res) => {
    const avatarPath = path.resolve("public", "avatars");
    
    try {
        const { _id, } = req.user;
        const { path: oldPath, filename } = req.file;
        
        const newPath = path.join(avatarPath, filename);
        await fs.rename(oldPath, newPath);

        const avatarURL = path.join("public", "avatars", filename);
        await User.findByIdAndUpdate(_id, { avatarURL });

        res.json({ avatarURL });
    }
    catch (error) {
        await fs.unlink(oldPath);
        throw error;
    }
};

export default ctrlWrapper(avatar);