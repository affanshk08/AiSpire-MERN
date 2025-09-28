import express from 'express';
const router = express.Router();
import { getUsers } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getUsers);

export default router;