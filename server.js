const express = require('express');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const PORT = 3000;

// Statik dosyaları sun
app.use(express.static(path.join(__dirname, 'public')));

// Socket.IO
const server = require('http').createServer(app);
const io = socketIo(server);

// Kullanıcı odaları
const rooms = new Map();

io.on('connection', (socket) => {
    console.log('Yeni kullanıcı bağlandı');

    // Odaya katılma
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(`Kullanıcı ${roomId} odasına katıldı`);
        
        // Oda bilgilerini güncelle
        if (!rooms.has(roomId)) {
            rooms.set(roomId, {
                users: new Set()
            });
        }
        rooms.get(roomId).users.add(socket.id);
    });

    // Mesaj gönderme
    socket.on('send-message', (data) => {
        io.to(data.roomId).emit('receive-message', {
            text: data.text,
            sender: socket.id
        });
    });

    // Bağlantı kesilme
    socket.on('disconnect', () => {
        console.log('Kullanıcı ayrıldı');
        
        // Kullanıcıyı odalardan çıkar
        rooms.forEach((room, roomId) => {
            if (room.users.has(socket.id)) {
                room.users.delete(socket.id);
                if (room.users.size === 0) {
                    rooms.delete(roomId);
                }
            }
        });
    });
});

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
}); 