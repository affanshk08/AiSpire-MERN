import express from 'express';
const router = express.Router();
import {
  getAssessments,
  getAssessmentById,
  submitAssessment,
} from '../controllers/assessmentController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getAssessments);
router.route('/:id').get(getAssessmentById);
router.route('/:id/submit').post(protect, submitAssessment);

export default router;