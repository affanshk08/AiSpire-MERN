const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  averageSalary: {
    type: Number,
    required: true,
  },
  requiredEducation: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('Career', careerSchema);