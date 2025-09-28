import asyncHandler from 'express-async-handler';
import Assessment from '../models/Assessment.js'; // Default import se match karein
import User from '../models/User.js';

const getAssessments = asyncHandler(async (req, res) => {
  const assessments = await Assessment.find({});
  res.json(assessments);
});

const getAssessmentById = asyncHandler(async (req, res) => {
  const assessment = await Assessment.findById(req.params.id);

  if (assessment) {
    res.json(assessment);
  } else {
    res.status(404);
    throw new Error('Assessment not found');
  }
});

const submitAssessment = asyncHandler(async (req, res) => {
  const { answers } = req.body;
  const assessment = await Assessment.findById(req.params.id);

  if (assessment) {
    res.status(200).json({ message: 'Assessment submitted successfully.' });
  } else {
    res.status(404);
    throw new Error('Assessment not found');
  }
});

export { getAssessments, getAssessmentById, submitAssessment };