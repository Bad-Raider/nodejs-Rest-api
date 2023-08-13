import Jimp from "jimp";

const updateAvatar = async (req, res, next) => {
    const { path } = req.file;

    if (!path) {
        res.status(401);
        throw new Error(`message: Update avatar error`);
    }

    await Jimp.read(path)
        .then((img) => {
            return img.resize(250, 250).write(`${path}`);
        })
        .catch((err) => {
            console.error(err);
        });
    next();
};

export default updateAvatar;