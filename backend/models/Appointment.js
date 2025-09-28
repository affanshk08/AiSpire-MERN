const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  counselor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming counselors are also users with a specific role
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  notes: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);