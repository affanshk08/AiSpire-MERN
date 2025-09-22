const asyncHandler = require('express-async-handler');

// @desc    Process payment
// @route   POST /api/payment
// @access  Private
const processPayment = asyncHandler(async (req, res) => {
  // This is a placeholder for a real payment gateway integration.
  // For now, we'll just simulate a successful payment after a short delay.
  setTimeout(() => {
    res.status(200).json({ success: true, message: 'Payment successful' });
  }, 1000);
});

module.exports = {
  processPayment,
};