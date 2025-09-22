const Appointment = require('../models/Appointment');
const asyncHandler = require('express-async-handler');

// @desc    Book an appointment
// @route   POST /api/appointments
// @access  Private
const bookAppointment = asyncHandler(async (req, res) => {
  const { counselor, date, time } = req.body;

  if (!counselor || !date || !time) {
    res.status(400);
    throw new Error('Please provide all appointment details');
  }

  const appointment = new Appointment({
    user: req.user._id,
    counselor,
    date,
    time,
    paymentStatus: 'Paid',
  });

  const createdAppointment = await appointment.save();
  res.status(201).json(createdAppointment);
});

// @desc    Get appointments for logged in user
// @route   GET /api/appointments
// @access  Private
const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id });
  res.json(appointments);
});

// @desc    Cancel an appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const cancelAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    if (appointment.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized');
    }
    await appointment.remove();
    res.json({ message: 'Appointment cancelled' });
  } else {
    res.status(404);
    throw new Error('Appointment not found');
  }
});

module.exports = {
  bookAppointment,
  getAppointments,
  cancelAppointment,
};