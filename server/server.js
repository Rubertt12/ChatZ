const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/chat.html'));
});

const clients = []; // Armazena os clientes conectados

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const clientId = Date.now();
    const newClient = { id: clientId, res };
    clients.push(newClient);

    // Envia uma mensagem de boas-vindas ao cliente
    res.write('data: Welcome!\n\n');

    req.on('close', () => {
        console.log(`Cliente ${clientId} desconectado`);
        clients.splice(clients.findIndex(c => c.id === clientId), 1);
    });
});

function sendToClients(message) {
    clients.forEach(client => {
        client.res.write(`data: ${JSON.stringify(message)}\n\n`);
    });
}

app.post('/sendMessage', express.json(), (req, res) => {
    const message = req.body;
    sendToClients(message);
    res.status(200).end();
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
