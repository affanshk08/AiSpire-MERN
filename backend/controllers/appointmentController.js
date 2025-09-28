import { Appointment } from '../models/Appointment.js';
import asyncHandler from 'express-async-handler';

const createAppointment = asyncHandler(async (req, res) => {
  const { date, time, counselor } = req.body;

  if (!date || !time || !counselor) {
    res.status(400);
    throw new Error('Please provide all appointment details');
  }

  // Combine date and time strings into a single Date object
  const appointmentDate = new Date(`${date}T${time}`);

  const appointment = new Appointment({
    user: req.user._id,
    date: appointmentDate,
    time,
    counselor,
    status: 'Confirmed'
  });

  const createdAppointment = await appointment.save();
  res.status(201).json(createdAppointment);
});

const getUserAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id }).sort({ date: -1 });
  res.json(appointments);
});

// @desc    Get all appointments (Admin only)
// @route   GET /api/appointments/all
// @access  Private/Admin
const getAllAppointments = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }

  const appointments = await Appointment.find({})
    .populate('user', 'name email')
    .sort({ date: -1 });
  res.json(appointments);
});


export { createAppointment, getUserAppointments, getAllAppointments };