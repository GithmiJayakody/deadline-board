const express = require('express');
const router = express.Router();
const Deadline = require('../models/Deadline');
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware);


router.get('/', async (req, res) => {
  try {
    const deadlines = await Deadline.find({ userId: req.userId }).sort({ dueDate: 1 });
    res.json(deadlines);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { title, subject, type, dueDate, priority } = req.body;
    const newDeadline = new Deadline({
      userId: req.userId,
      title,
      subject,
      type,
      dueDate,
      priority
    });
    await newDeadline.save();
    res.status(201).json(newDeadline);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const deadline = await Deadline.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!deadline) return res.status(404).json({ message: 'Deadline not found' });
    res.json(deadline);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deadline = await Deadline.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deadline) return res.status(404).json({ message: 'Deadline not found' });
    res.json({ message: 'Deadline deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.patch('/:id/complete', async (req, res) => {
  try {
    const deadline = await Deadline.findOne({ _id: req.params.id, userId: req.userId });
    if (!deadline) return res.status(404).json({ message: 'Deadline not found' });

    deadline.status = deadline.status === 'completed' ? 'pending' : 'completed';
    await deadline.save();
    res.json(deadline);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;