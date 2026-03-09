const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const auth = require('../middleware/auth');

// Submit contact form (public)
router.post('/send', async (req, res) => {
  try {
    const { name, email, subject, message, userId } = req.body;
    
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      user: userId
    });
    await contact.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all messages (authenticated)
router.get('/messages', auth, async (req, res) => {
  try {
    const messages = await Contact.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;