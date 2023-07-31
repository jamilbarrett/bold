const router = require('express').Router()
const {User} = require('../model')

// Get All Users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})

        res.json(users)
    } catch (err) {
        res.status(500).json({err: 'Unable to fetch users'})
    }
})

// Get a Single User
router.get('/user/:id', async (req, res) => {
    try {
      const userId = req.params.id
  
      // Find the user by ID
      const user = await User.findById(userId)
      .populate('thought')
      .populate('friends')
  
      if (user) {
        res.json(user);
      } else {
        res.json({
          message: 'User not found',
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Unable to find user')
    }
  });

//   Create a user
router.post('/user', async (req, res) => {
    try {
      const user = await User.create(req.body)
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json('Failed to create user')
    }
  });

//   Update a user
router.put('/user', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({
            name: username
        })
    }
})
  
// Update a user by ID
router.put('/user/:id', async (req, res) => {
  try {
    const userId = req.params.user_id
    const updatedUserData = req.body

    // Find the user by ID and update its data
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true })

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
});

// Delete a user by ID
router.delete('/user/:user_id', async (req, res) => {
  try {
    const userId = req.params.user_id

    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(userId)

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
});


//   Export router
  module.exports = router;
  
  
  



