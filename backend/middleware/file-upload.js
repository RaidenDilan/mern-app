const multer = require('multer');
const { v1: uuid } = require('uuid');

const MIMI_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images'); // null => no error
    },
    filename: (req, file, cb) => {
      const ext = MIMI_TYPE_MAP[file.mimetype];
      cb(null, uuid() + '.' + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIMI_TYPE_MAP[file.mimetype]; // !! =< convert undefined/null to true/false/
    let err = isValid ? null : new Error('Invalid mime type');
    cb(err, isValid);
  }
});

module.exports = fileUpload;
