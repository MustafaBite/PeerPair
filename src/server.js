const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Statik dosyaları sun
app.use(express.static(path.join(__dirname, '../public')));

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Login sayfası
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Chat sayfası
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/chat.html'));
});

// Socket.io bağlantı yönetimi
io.on('connection', (socket) => {
    console.log('PeerPair: Yeni kullanıcı bağlandı');
    
    socket.on('disconnect', () => {
        console.log('PeerPair: Kullanıcı ayrıldı');
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Sunucu hatası'
  });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'; // Tüm ağ arayüzlerini dinle

http.listen(PORT, HOST, () => {
    console.log(`PeerPair sunucusu http://localhost:${PORT} adresinde çalışıyor`);
    console.log(`Ağ üzerinden erişim için: http://[YOUR_IP_ADDRESS]:${PORT}`);
}); 