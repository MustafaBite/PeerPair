const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// Kayıt olma route'u
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Gerekli alanların kontrolü
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Ad Soyad, E-posta ve Şifre alanları zorunludur'
    });
  }

  // E-posta domain kontrolü
  if (!email.endsWith('@firat.edu.tr')) {
    return res.status(400).json({
      success: false,
      message: 'Sadece Fırat Üniversitesi öğrencileri kayıt olabilir'
    });
  }

  try {
    // E-posta adresinin benzersiz olup olmadığını kontrol et
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Veritabanı hatası'
        });
      }

      if (user) {
        return res.status(400).json({
          success: false,
          message: 'Bu e-posta adresi zaten kullanımda'
        });
      }

      // Şifreyi hashle
      const hashedPassword = await bcrypt.hash(password, 10);

      // Yeni kullanıcıyı kaydet
      db.run(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword],
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

// ... existing code ... 