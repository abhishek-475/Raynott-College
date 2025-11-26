const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getAllDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment
} = require('../controllers/departmentController');

router.get('/', getAllDepartments);
router.get('/:slug', getDepartment);
router.post('/', protect, admin, createDepartment);
router.put('/:id', protect, admin, updateDepartment);
router.delete('/:id', protect, admin, deleteDepartment);

module.exports = router;
