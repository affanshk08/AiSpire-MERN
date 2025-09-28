const express = require('express');
const router = express.Router();
const {
  getAppointments,
  bookAppointment,
  cancelAppointment,
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getAppointments).post(protect, bookAppointment);
router.route('/:id').delete(protect, cancelAppointment);

module.exports = router;