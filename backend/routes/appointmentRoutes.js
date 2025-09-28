import express from 'express';
const router = express.Router();
import {
  createAppointment,
  getUserAppointments,
  getAllAppointments,
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createAppointment);
router.route('/myappointments').get(protect, getUserAppointments);
router.route('/all').get(protect, getAllAppointments); // New route for admins

export default router;