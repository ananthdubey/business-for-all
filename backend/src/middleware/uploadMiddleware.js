const fs = require('fs');
const path = require('path');
const multer = require('multer');
const ApiError = require('../utils/ApiError');

const uploadDirectory = path.join(__dirname, '..', '..', 'uploads', 'documents');
fs.mkdirSync(uploadDirectory, { recursive: true });

const allowedMimeTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (_req, file, cb) => {
    const sanitizedName = file.originalname.replace(/\s+/g, '-').toLowerCase();
    cb(null, `${Date.now()}-${sanitizedName}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (!allowedMimeTypes.has(file.mimetype)) {
    cb(new ApiError(400, 'Only PDF, DOC, DOCX, JPG, and PNG files are allowed'));
    return;
  }

  cb(null, true);
};

const uploadDocuments = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },
  fileFilter,
});

module.exports = {
  uploadDocuments,
};
