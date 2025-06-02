const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Veritabanı bağlantısını oluştur
const db = new sqlite3.Database(path.join(__dirname, 'peerpair.db'), (err) => {
  if (err) {
    console.error('Veritabanına bağlanırken hata oluştu:', err.message);
  } else {
    console.log('SQLite veritabanına bağlandı');
    // Users tablosunu oluştur
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Tablo oluşturulurken hata:', err.message);
      } else {
        console.log('Users tablosu hazır');
      }
    });
  }
});

module.exports = db; 