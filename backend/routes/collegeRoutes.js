const express = require('express');
const router = express.Router();
const { getColleges } = require('../controllers/collegeController');

router.route('/').get(getColleges);

module.exports = router;