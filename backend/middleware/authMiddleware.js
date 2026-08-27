const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'veloce_car_rental_jwt_secret_key_2026';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      if (decoded.id && decoded.id.startsWith('mem-')) {
        // Fallback for memory mode
        req.user = {
          id: decoded.id,
          _id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role
        };
        return next();
      }

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User no longer exists' });
      }
      return next();
    } catch (err) {
      console.error('[Auth Middleware Error]:', err.message);
      return res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied: Admin privileges required' });
  }
};

module.exports = {
  protect,
  adminOnly,
  JWT_SECRET
};
