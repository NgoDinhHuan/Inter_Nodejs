const multer = require("multer");

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/upload/images');
  },
  filename: (req, file, cb) => {
 
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage: storage });

module.exports = upload;