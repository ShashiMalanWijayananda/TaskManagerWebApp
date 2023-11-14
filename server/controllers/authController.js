const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const JWT_SECRET = 'malanShashi'; // Change this to a secure random string

const generateToken = (user) => {
  return jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
};

const register = async (req, res) => {
  try {
    const { name, department, telephoneNumber, email, role, password } = req.body;

    // Check if the user with the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      department,
      telephoneNumber,
      email,
      role,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token after successful registration
    const token = generateToken(newUser);

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token after successful login
    const token = generateToken(user);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { register, login };
