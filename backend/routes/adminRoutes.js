const express = require('express');
const router = express.Router();
const { getAppointments, getContacts } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.route('/appointments').get(protect, admin, getAppointments);
router.route('/contacts').get(protect, admin, getContacts);

module.exports = router;