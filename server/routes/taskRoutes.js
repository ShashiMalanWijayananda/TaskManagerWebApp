const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

// Create a task route
router.post('/tasks', verifyToken, taskController.createTask);

// Get all tasks route
router.get('/tasks', verifyToken, taskController.getAllTasks);

// Get task by ID route
router.get('/tasks/:taskId', verifyToken, taskController.getTaskById);

// Update task route
router.put('/tasks/:taskId', verifyToken, taskController.updateTask);

// Delete task route
router.delete('/tasks/:taskId', verifyToken, taskController.deleteTask);


// Admin approval route
router.put('/tasks/:taskId/approve', verifyToken, taskController.approveTask);

module.exports = router;
