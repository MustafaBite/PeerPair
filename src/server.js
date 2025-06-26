const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const path = require('path');
const http = require('http');

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    message: 'Sunucu hatası',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Routes
app.use('/auth', authRoutes);

// API health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Socket.io setup
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://your-production-domain.com' 
      : 'http://localhost:3000',
    credentials: true
  }
});

// Socket.io connection management
io.on('connection', (socket) => {
  console.log('PeerPair: New user connected', socket.id);
  
  socket.on('disconnect', () => {
    console.log('PeerPair: User disconnected', socket.id);
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

// Start server
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'; // Tüm ağ arayüzlerinden bağlantıya izin ver

server.listen(PORT, HOST, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Network access: http://[YOUR_IP_ADDRESS]:${PORT}`);
}); 