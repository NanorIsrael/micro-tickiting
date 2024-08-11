import multer from "multer";
import fs from "fs";
// file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public/assets/uploads")) {
      fs.mkdirSync("public/assets/uploads");
    }
    cb(null, "public/assets/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
