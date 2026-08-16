import multer from 'multer';
import { ApiError } from '../utils/index.js';
import { HTTP_STATUS } from '../constants/index.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        'Only JPEG, PNG or WEBP images are allowed'
      ),
      false
    );
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },
});

export default upload;
