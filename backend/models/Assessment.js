import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
  text: { type: String, required: true },
  options: [{ text: String, score: Number }],
});

const assessmentSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [questionSchema],
});

const Assessment = mongoose.model('Assessment', assessmentSchema);
// Default export ka istemal karein
export default Assessment;