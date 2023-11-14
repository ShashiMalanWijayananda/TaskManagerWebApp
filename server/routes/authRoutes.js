const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Install bcrypt if not already installed
const jwt = require('jsonwebtoken');



// Secret key for signing JWTs
const JWT_SECRET = 'malanShashi';
// Mock user database (for demonstration purposes)
const users = [];

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    if (users.find((user) => user.username === username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = {
      username,
      password: hashedPassword,
    };

    // Save the user to the mock database (replace with MongoDB logic)
    users.push(newUser);
 // Generate a JWT token after successful registration
 const token = jwt.sign({ username: newUser.username }, JWT_SECRET);
 res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the mock database (replace with MongoDB logic)
    const user = users.find((user) => user.username === username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
// Generate a JWT token after successful login
const token = jwt.sign({ username: user.username }, JWT_SECRET);
res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
