import multer from 'multer';
import { ApiError } from '../utils/index.js';
import { HTTP_STATUS } from '../constants/index.js';

const storage = multer.memoryStorage();

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

const fileFilter = (req, file, cb) => {
  const extension = file.originalname
    ?.slice(file.originalname.lastIndexOf('.'))
    .toLowerCase();

  const isValidExtension = ALLOWED_EXTENSIONS.includes(extension);

  if (!isValidExtension) {
    return cb(
      new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        'Only JPG, PNG or WEBP images are allowed.'
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
