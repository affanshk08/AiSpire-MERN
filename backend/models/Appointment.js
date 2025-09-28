import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  counselor: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Confirmed', 'scheduled', 'completed', 'cancelled'],
    default: 'Confirmed',
  },
  notes: String,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
// Named export ka istemal karein
export { Appointment };