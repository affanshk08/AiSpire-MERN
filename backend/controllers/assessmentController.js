const Assessment = require('../models/Assessment');

// @desc    Get all assessments for a user
// @route   GET /api/assessments
// @access  Private
const getAssessments = async (req, res) => {
  res.status(200).json({ message: 'Get assessments' });
};

// @desc    Take a new assessment
// @route   POST /api/assessments
// @access  Private
const takeAssessment = async (req, res) => {
  res.status(201).json({ message: 'Take assessment' });
};

// @desc    Get assessment results
// @route   GET /api/assessments/:id/result
// @access  Private
const getAssessmentResult = async (req, res) => {
  res.status(200).json({ message: `Get result for assessment ${req.params.id}` });
};

module.exports = {
  getAssessments,
  takeAssessment,
  getAssessmentResult,
};