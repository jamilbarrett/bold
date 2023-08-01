const router = require('express').Router();
const { User, Thought } = require('../model/');
const { reactionSchema } = require('../model/Thought');

// Get All Thoughts
router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find();

    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

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
    const thought = await Thought.create(req.body);
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json('Failed to create thought');
  }
});

// Update a Thought
router.put('/thoughts/:id', async (req, res) => {
  try {
    const thoughtId = req.params.id;
    const updateThought = req.body;

    const updatedThought = await Thought.findByIdAndUpdate(thoughtId,updateThought,{ new: true });

    if (!updatedThought) {
      return res.status(404).json({
        message: 'unable to update thought'
      });
    }

    res.json(updatedThought);
  } catch (error) {
    console.error('Error updating thought:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Remove a Thought by ID
router.delete('/thoughts/:id', async (req, res) => {
  try {
    const thoughtId = req.params.id;

    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    const deletedThought = await Thought.findByIdAndDelete(thoughtId);
    if (!deletedThought) {
      return res.status(404).json({ message: 'Unable to delete thought' });
    }

    res.status(200).json({ message: 'Thought Deleted' });
  } catch (error) {
    console.error('Error deleting thought:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Add a reaction/like to a thought
router.post('/thoughts/:id/reactions', async (req, res) => {
  try {
    const thoughtId = req.params.id;
    const reaction = req.body;

    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    thought.reactions.push(reaction);

    await thought.save();

    return res.json(thought);
  } catch (error) {
    console.error('Error adding reaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/thoughts/:id/reactions/:reactionId', async (req, res) => {
  try {
    const { id: thoughtId, reactionId } = req.params;

    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    thought.reactions = thought.reactions.filter(
      reaction => reaction._id.toString() !== reactionId
    );

    await thought.save();

    return res.json(thought);
  } catch (error) {
    console.error('Error removing reaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Export router
module.exports = router;
