const express = require('express');
const {
  getAdminApplications,
  updateApplicationStatus,
  getAdminUsers,
  getDashboardStats,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { updateApplicationStatusValidator } = require('../validators/adminValidators');

const router = express.Router();

router.use(protect, adminOnly);

router.get('/applications', getAdminApplications);
router.put('/applications/:id/status', updateApplicationStatusValidator, validateRequest, updateApplicationStatus);
router.get('/users', getAdminUsers);
router.get('/dashboard-stats', getDashboardStats);

module.exports = router;
