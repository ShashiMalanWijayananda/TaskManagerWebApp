const Task = require('../models/Task');

// Create a task
const createTask = async (req, res) => {
  try {
    const { category, description, priority } = req.body;

    // Create a new task with current date and time
    const newTask = new Task({
      category,
      description,
      priority,
      assignDate: new Date(), // Capture current date and time
      status: 'Pending',
    });

    // Save the task to the database
    await newTask.save();

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    // Get all tasks from the database
    const tasks = await Task.find();

    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Find the task by ID in the database
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { category, description, priority, completedDate, status } = req.body;

    // Find the task by ID in the database
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update task properties
    task.category = category || task.category;
    task.description = description || task.description;
    task.priority = priority || task.priority;
    task.completedDate = completedDate || task.completedDate;
    task.status = status || task.status;

    // Save the updated task to the database
    await task.save();

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Find the task by ID in the database
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Delete the task from the database
    await task.remove();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Admin approval for task completion
const approveTask = async (req, res) => {
    try {
      const { taskId } = req.params;
  
      // Find the task by ID in the database
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      // Check if the task is already marked as completed
      if (task.status === 'Completed') {
        return res.status(400).json({ error: 'Task is already marked as completed' });
      }
  
      // Update task status to 'Completed'
      task.status = 'Completed';
  
      // Save the updated task to the database
      await task.save();
  
      res.status(200).json({ message: 'Task completion approved successfully', task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  approveTask,
};
