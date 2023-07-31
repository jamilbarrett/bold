const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');
const User = require('../models/User');

// Get All Thoughts
router.get('/api/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (error) {
    console.error('Error fetching thoughts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a single thought by ID
router.get('/api/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.status(200).json(thought);
  } catch (error) {
    console.error('Error fetching thought:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create New Thought
router.post('/api/thoughts', async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    // Create the new thought
    const newThought = new Thought({ title, content });
    await newThought.save();

    // Push the created thought's ID to the Users thoughts
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.thoughts.push(newThought._id);
    await user.save();

    res.status(201).json(newThought);
  } catch (error) {
    console.error('Error creating thought:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//  Update a Thought
router.put('/api/thoughts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
  
      const thought = await Thought.findById(id);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      thought.title = title;
      thought.content = content;
      await thought.save();
  
      res.status(200).json(thought);
    } catch (error) {
      console.error('Error updating thought:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Remove a Thought by ID
  router.delete('/api/thoughts/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const thought = await Thought.findById(id);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      // Remove thought from a User
      const userId = thought.userId; // Assuming you have a userId field in the Thought model
      const user = await User.findById(userId);
      if (user) {
        user.thoughts.pull(id);
        await user.save();
      }
  
      await thought.remove();
  
      res.status(200).json({ message: 'Thought Removed' });
    } catch (error) {
      console.error('Error removing thought:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
