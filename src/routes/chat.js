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

// Sohbet odası oluşturma
router.post('/room', auth, async (req, res) => {
    try {
        const { userId } = req.body;
        
        // Kullanıcının arkadaşı mı kontrol et
        if (!req.user.friends.includes(userId)) {
            return res.status(403).json({ message: 'Bu kullanıcı ile sohbet edemezsiniz' });
        }

        // Oda ID'sini oluştur (kullanıcı ID'lerinin sıralı birleşimi)
        const roomId = [req.user._id, userId].sort().join('_');

        res.json({ roomId });
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
});

// Sohbet geçmişi
router.get('/history/:roomId', auth, async (req, res) => {
    try {
        // Burada sohbet geçmişi veritabanından alınacak
        // Şimdilik boş bir dizi döndürüyoruz
        res.json([]);
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
});

module.exports = router; 