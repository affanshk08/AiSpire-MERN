const express = require('express');
const router = express.Router();
const {
  addCareer,
  getCareers,
  getCareerById,
} = require('../controllers/careerController');
const { protect } = require('../middleware/authMiddleware'); // Optional: protect add route

// We'll leave the addCareer route public for now to easily add data.
// You could add `protect` middleware to it later.
router.route('/').get(getCareers).post(addCareer);
router.route('/:id').get(getCareerById);

module.exports = router;