const express = require('express');
const router = express.Router();
const {
  getAssessments,
  takeAssessment,
  getAssessmentResult,
} = require('../controllers/assessmentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getAssessments).post(protect, takeAssessment);
router.get('/:id/result', protect, getAssessmentResult);

module.exports = router;