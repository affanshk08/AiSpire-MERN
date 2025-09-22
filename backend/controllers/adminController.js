const Appointment = require('../models/Appointment');
const Contact = require('../models/Contact');
const asyncHandler = require('express-async-handler');

// @desc    Get all appointments
// @route   GET /api/admin/appointments
// @access  Private/Admin
const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({}).populate('user', 'name email');
  res.json(appointments);
});

// @desc    Get all contact messages
// @route   GET /api/admin/contacts
// @access  Private/Admin
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({}).sort({ createdAt: -1 });
  res.json(contacts);
});

module.exports = {
  getAppointments,
  getContacts,
};