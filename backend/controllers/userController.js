import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
  const users = await User.find({}).select('-password');
  res.json(users);
});

export { getUsers };