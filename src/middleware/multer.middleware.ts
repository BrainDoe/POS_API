import multer from "multer";
import storage from "../utils/cloudinary-storage.util";

const upload = multer({ storage });

export default upload;
