import multer from 'multer';

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original name of the file for storage
  }
});

const uploadData = multer({ storage: storage });

export default uploadData;
