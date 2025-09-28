const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assessmentType: {
    type: String,
    required: true,
    enum: ['personality', 'interest', 'skills'],
  },
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: String,
    },
  ],
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      selectedOption: String,
    },
  ],
  results: {
    type: Map,
    of: String,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Assessment', assessmentSchema);