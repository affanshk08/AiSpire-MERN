const express = require('express');
const router = express.Router();
const {
  addCareer,
  getCareers,
  getCareerById,
} = require('../controllers/careerController');

router.route('/').get(getCareers).post(addCareer);
router.route('/:id').get(getCareerById);

module.exports = router;