document.addEventListener('DOMContentLoaded', () => {
    const chatName = localStorage.getItem('chatName');
    const chatCode = localStorage.getItem('chatCode');

    if (!chatName || !chatCode) {
        window.location.href = '/';
        return;
    }

    const chatCodeElement = document.getElementById('chatCode');
    chatCodeElement.textContent = chatCode;

    const socket = io();
    const form = document.getElementById('messageForm');
    const input = document.getElementById('messageInput');
    const messages = document.getElementById('messages');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const messageText = input.value.trim();
        if (messageText) {
            const message = {
                name: chatName,
                text: messageText
            };
            socket.emit('sendMessage', message);
            input.value = '';
        }
    });

    socket.on('message', (message) => {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message');
        messageContainer.classList.add(message.name === chatName ? 'user2' : 'user1');
        messageContainer.innerHTML = `<strong>${message.name}:</strong> ${message.text}`;
        messages.appendChild(messageContainer);
        messages.scrollTop = messages.scrollHeight;
    });

    socket.on('error', () => {
        console.error('Erro na conexão com o servidor');
    });
});
