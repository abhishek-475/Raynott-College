const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { createContact, getContacts } = require('../controllers/contactController');

router.post('/', createContact);
router.get('/', protect, admin, getContacts);

module.exports = router;
