const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
// Middleware to parse JSON requests
app.use(express.json());

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://shashimalanedu:oeKuyK91SfsmoaIK@cluster0.5fnqhu5.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import and use routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

// Use the authentication routes
app.use('/api/auth', authRoutes);

// Use the task-related routes
app.use('/api/tasks', taskRoutes);

// Use the user-related routes
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, this is your Express.js server!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
