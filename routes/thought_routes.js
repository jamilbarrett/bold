const router = require('express').Router()
const { User, Thought } = require('../model/');

// Get All Thoughts
router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find()

    res.json(thoughts)
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Get a single thought by ID
router.get('/thoughts/:id', async (req, res) => {
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
router.post('/thoughts', async (req, res) => {
  try {
    const thought = await Thought.create(req.body)

    res.json(thought)


  } catch (err) {
    console.error(err);
    res.status(500).json('Failed to create thought')
  }

})

//  Update a Thought
router.put('/thoughts/:id', async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { thoughtText, username } = req.body;

    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    thought.thoughtText = thoughtText;
    thought.username = username;
    await thought.save();

    res.status(200).json(thought);
  } catch (error) {
    console.error('Error updating thought:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Remove a Thought by ID
router.delete('/thoughts/:id', async (req, res) => {
  try {
    const { thoughtId } = req.params;

    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Remove thought from a User
    const userId = thought.userId; // Assuming you have a userId field in the Thought model
    const user = await User.findById(userId);
    if (user) {
      user.thoughts.pull(thoughtId);
      await user.save();
    }

    await thought.remove();

    res.status(200).json({ message: 'Thought Removed' });
  } catch (error) {
    console.error('Error removing thought:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export router
module.exports = router;
