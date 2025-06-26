const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify JWT token
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Yetkilendirme token\'ı gerekli' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Geçersiz token' });
  }
};

// Register route
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, faculty, grade } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !faculty || !grade) {
      return res.status(400).json({ message: 'Tüm alanlar zorunludur' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kullanılıyor' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      faculty,
      grade
    });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    // Return user data (excluding password)
    res.status(201).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        faculty: user.faculty,
        grade: user.grade
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Kayıt işlemi sırasında bir hata oluştu' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'E-posta ve şifre zorunludur' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    // Return user data (excluding password)
    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        faculty: user.faculty,
        grade: user.grade
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Giriş işlemi sırasında bir hata oluştu' });
  }
});

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    res.json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        faculty: user.faculty,
        grade: user.grade
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Profil bilgileri alınırken bir hata oluştu' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { fullName, email, faculty, grade } = req.body;

    // Validate required fields
    if (!fullName || !email || !faculty || !grade) {
      return res.status(400).json({ message: 'Tüm alanlar zorunludur' });
    }

    // Check if email is already used by another user
    const existingUser = await User.findOne({ email, _id: { $ne: req.userId } });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kullanılıyor' });
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      req.userId,
      { fullName, email, faculty, grade },
      { new: true }
    );

    res.json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        faculty: user.faculty,
        grade: user.grade
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Profil güncellenirken bir hata oluştu' });
  }
});

module.exports = router; 