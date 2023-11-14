const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  assignDate: {
    type: Date,
    default: Date.now,
  },
  completedDate: {
    type: Date,
  },
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  status: {
    type: String,
    enum: ['Pending', 'InProgress', 'Completed'],
    default: 'Pending',
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
