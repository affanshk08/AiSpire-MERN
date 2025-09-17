const Appointment = require('../models/Appointment');

// @desc    Get user's appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
  res.status(200).json({ message: "Get user's appointments" });
};

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private
const bookAppointment = async (req, res) => {
  res.status(201).json({ message: 'Book appointment' });
};

// @desc    Cancel an appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const cancelAppointment = async (req, res) => {
  res.status(200).json({ message: `Cancel appointment ${req.params.id}` });
};

module.exports = {
  getAppointments,
  bookAppointment,
  cancelAppointment,
};