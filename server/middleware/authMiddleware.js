const jwt = require('jsonwebtoken');

// Authentication middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Check if the user is an admin
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ error: 'Access denied. Admin permissions required.' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = verifyToken;
