const Contact = require('../models/Contact');
const asyncHandler = require('express-async-handler');

// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
const createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Please provide all fields');
  }

  const contact = new Contact({
    name,
    email,
    message,
  });

  const createdContact = await contact.save();
  res.status(201).json(createdContact);
});

module.exports = {
  createContactMessage,
};