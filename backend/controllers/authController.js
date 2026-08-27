const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');
const { JWT_SECRET } = require('../middleware/authMiddleware');

// In-memory fallback users for non-DB mode
let memoryUsers = [];

// Helper token generator
const generateToken = (id, name, email, role) => {
  return jwt.sign({ id, name, email, role }, JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Seed default Admin user
const seedDefaultAdmin = async () => {
  const adminEmail = 'admin@veloce.in';
  const adminPassword = 'admin123';

  try {
    if (getIsConnected()) {
      const existingAdmin = await User.findOne({ email: adminEmail });
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await User.create({
          name: 'Veloce System Admin',
          email: adminEmail,
          phone: '+91 98765 43210',
          password: hashedPassword,
          role: 'admin'
        });
        console.log(`[AUTH SEED] Created default admin: ${adminEmail} / ${adminPassword}`);
      }
    } else {
      const existingAdmin = memoryUsers.find(u => u.email === adminEmail);
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        memoryUsers.push({
          id: 'mem-admin-1',
          _id: 'mem-admin-1',
          name: 'Veloce System Admin',
          email: adminEmail,
          phone: '+91 98765 43210',
          password: hashedPassword,
          role: 'admin'
        });
        console.log(`[AUTH SEED MEMORY] Created default admin: ${adminEmail} / ${adminPassword}`);
      }
    }
  } catch (err) {
    console.error('[AUTH SEED ERROR]:', err.message);
  }
};

// POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    const assignedRole = role === 'admin' ? 'admin' : 'user';

    if (getIsConnected()) {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email: email.toLowerCase(),
        phone: phone || '',
        password: hashedPassword,
        role: assignedRole
      });

      const token = generateToken(user._id, user.name, user.email, user.role);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        }
      });
    } else {
      const existing = memoryUsers.find(u => u.email === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        id: `mem-usr-${Date.now()}`,
        _id: `mem-usr-${Date.now()}`,
        name,
        email: email.toLowerCase(),
        phone: phone || '',
        password: hashedPassword,
        role: assignedRole
      };

      memoryUsers.push(user);
      const token = generateToken(user.id, user.name, user.email, user.role);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        }
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter email and password' });
    }

    if (getIsConnected()) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const token = generateToken(user._id, user.name, user.email, user.role);

      return res.json({
        success: true,
        message: 'Logged in successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        }
      });
    } else {
      const user = memoryUsers.find(u => u.email === email.toLowerCase());
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const token = generateToken(user.id, user.name, user.email, user.role);

      return res.json({
        success: true,
        message: 'Logged in successfully',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        }
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  try {
    return res.json({
      success: true,
      user: req.user
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  seedDefaultAdmin
};
