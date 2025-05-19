const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// Kayıt olma route'u
router.post('/register', async (req, res) => {
  const { name, password } = req.body;

  // Gerekli alanların kontrolü
  if (!name || !password) {
    return res.status(400).json({
      success: false,
      message: 'Ad Soyad ve Şifre alanları zorunludur'
    });
  }

  try {
    // Kullanıcı adının benzersiz olup olmadığını kontrol et
    db.get('SELECT * FROM users WHERE name = ?', [name], async (err, user) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Veritabanı hatası'
        });
      }

      if (user) {
        return res.status(400).json({
          success: false,
          message: 'Bu isimde bir kullanıcı zaten mevcut'
        });
      }

      // Şifreyi hashle
      const hashedPassword = await bcrypt.hash(password, 10);

      // Yeni kullanıcıyı kaydet
      db.run(
        'INSERT INTO users (name, password) VALUES (?, ?)',
        [name, hashedPassword],
        function(err) {
          if (err) {
            return res.status(500).json({
              success: false,
              message: 'Kullanıcı kaydedilirken bir hata oluştu'
            });
          }

          res.status(201).json({
            success: true,
            message: 'Kullanıcı başarıyla kaydedildi',
            userId: this.lastID
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
});

// Giriş yapma route'u
router.post('/login', (req, res) => {
  const { name, password } = req.body;

  // Gerekli alanların kontrolü
  if (!name || !password) {
    return res.status(400).json({
      success: false,
      message: 'Ad Soyad ve Şifre alanları zorunludur'
    });
  }

  // Kullanıcıyı bul
  db.get('SELECT * FROM users WHERE name = ?', [name], async (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Veritabanı hatası'
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      });
    }

    // Şifreyi kontrol et
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz şifre'
      });
    }

    // Başarılı giriş
    res.json({
      success: true,
      message: 'Giriş başarılı',
      user: {
        id: user.id,
        name: user.name
      }
    });
  });
});

module.exports = router; 