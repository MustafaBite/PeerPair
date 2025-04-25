const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware - JWT doğrulama
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.userId });
        
        if (!user) {
            throw new Error();
        }
        
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Lütfen giriş yapın' });
    }
};

// Kullanıcı profili
router.get('/profile', auth, async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
});

// Arkadaş ekleme
router.post('/friends/:userId', auth, async (req, res) => {
    try {
        const friend = await User.findById(req.params.userId);
        if (!friend) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        if (req.user.friends.includes(friend._id)) {
            return res.status(400).json({ message: 'Bu kullanıcı zaten arkadaşınız' });
        }

        req.user.friends.push(friend._id);
        await req.user.save();

        res.json({ message: 'Arkadaş eklendi' });
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
});

// Arkadaş listesi
router.get('/friends', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('friends');
        res.json(user.friends);
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
});

// Rastgele eşleşme
router.get('/match', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        // Aynı üniversite ve bölümden, arkadaş olmayan kullanıcıları bul
        const potentialMatches = await User.find({
            university: user.university,
            department: user.department,
            _id: { 
                $ne: user._id,
                $nin: user.friends
            }
        }).limit(5);

        res.json(potentialMatches);
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
});

module.exports = router; 