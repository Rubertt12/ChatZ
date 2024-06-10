const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/chat.html'));
});

io.on('connection', (socket) => {
    console.log('Novo usuário conectado');

    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
