const jwt = require('jsonwebtoken');

module.exports = (requiredRole = null) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Expect: Bearer <token>
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};
