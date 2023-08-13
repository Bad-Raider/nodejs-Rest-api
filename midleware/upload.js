import multer from "multer";
import path from "path";

const destination = path.resolve("tmp");
  
const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const { originalname } = file;
        const { _id } = req.user;
        const uniquePrefix = `${_id}-${Date.now()}`;
        const fileName = `${uniquePrefix}_${originalname}`;
        cb(null, fileName);
    }
});

const limits = {
    fileSize: 1024 * 1024 * 2,
}; 


const upload = multer({
    storage,
    limits,
});

export default upload;