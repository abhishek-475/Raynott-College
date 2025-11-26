const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createAdmission,
  getAdmissions,
  getAdmission,
  updateAdmissionStatus,
  deleteAdmission
} = require('../controllers/admissionController');

router.post('/', createAdmission);
router.get('/', protect, admin, getAdmissions);
router.get('/:id', protect, admin, getAdmission);
router.put('/:id/status', protect, admin, updateAdmissionStatus);
router.delete('/:id', protect, admin, deleteAdmission);

module.exports = router;
