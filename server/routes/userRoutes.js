const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Create a user route
router.post('/users', verifyToken, userController.createUser);

// Get all users route
router.get('/', verifyToken, userController.getAllUsers);

// Get user by ID route
router.get('/users/:userId', verifyToken, userController.getUserById);

// Update user route
router.put('/users/:userId', verifyToken, userController.updateUser);

// Delete user route
router.delete('/users/:userId', verifyToken, userController.deleteUser);
// Get user profile route
router.get('/profile', verifyToken, (req, res) => {
    try {
      const userProfile = req.user; // Assuming user information is stored in the JWT payload
      res.status(200).json({ userProfile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Logout route
  router.post('/logout', (req, res) => {
    // You may want to implement token invalidation logic here
    res.status(200).json({ message: 'Logout successful' });
  });
  
module.exports = router;
