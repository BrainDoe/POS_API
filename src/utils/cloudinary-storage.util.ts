import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary-config.util";

const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    // @ts-ignore
    folder: "product-pos",
    // transformation: [{ width: 500, height: 500, crop: "limit" }],
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

export default storage;
