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
  },
  requiredEducation: {
    type: String,
  },
  skills: [String],
  relatedFields: [String],
});

module.exports = mongoose.model('Career', careerSchema);