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
      const userId = req.params.id;
  
      const user = await User.findById(userId);
  
      if (user) {
        res.json(user);
      } else {
        res.json({
          message: 'User not found',
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Unable to find user');
    }
  });

//   Create a user
router.post('/user', async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json('Failed to create user');
    }
  });
  
//   Export router
  module.exports = router;
  
  
  
  
  
  






// Create a user
router.post('/user', async (req, res) => {
    const user = await User.create(req.body)

    res.json(user)
})


