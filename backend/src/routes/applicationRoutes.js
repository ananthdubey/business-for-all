const express = require('express');
const {
  createApplication,
  getMyApplications,
  getApplicationById,
  cancelApplication,
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { uploadDocuments } = require('../middleware/uploadMiddleware');
const { createApplicationValidator, idParamValidator } = require('../validators/applicationValidators');

const router = express.Router();

router.use(protect);

router.post(
  '/',
  uploadDocuments.array('documents', 5),
  createApplicationValidator,
  validateRequest,
  createApplication
);
router.get('/my', getMyApplications);
router.get('/:id', idParamValidator, validateRequest, getApplicationById);
router.put('/:id/cancel', idParamValidator, validateRequest, cancelApplication);

module.exports = router;
