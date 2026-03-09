const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add education
router.post('/education', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.education.push(req.body);
    await user.save();
    res.json(user.education);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add experience
router.post('/experience', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.experience.push(req.body);
    await user.save();
    res.json(user.experience);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add skill
router.post('/skills', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.skills.push(req.body);
    await user.save();
    res.json(user.skills);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;