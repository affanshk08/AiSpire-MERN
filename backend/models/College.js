// Note: This replaces the old `Colllege.js` file. Please delete the old file.
const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  speciality: { type: String, required: true },
  establishmentYear: { type: Number, required: true },
  affiliatedToVNSGU: { type: Boolean, default: false },
  courses: [String]
});

module.exports = mongoose.model('College', collegeSchema);