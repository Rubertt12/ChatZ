document.addEventListener('DOMContentLoaded', () => {
    const chatName = localStorage.getItem('chatName');
    const chatCode = localStorage.getItem('chatCode');
    if (!chatName || !chatCode) {
        window.location.href = '/';
        return;
    }

    document.getElementById('chatCode').textContent = chatCode;

    const socket = io();

    const form = document.getElementById('messageForm');
    const input = document.getElementById('messageInput');
    const messages = document.getElementById('messages');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (input.value) {
            const message = {
                name: chatName,
                text: input.value
            };
            socket.emit('sendMessage', message);
            input.value = '';
        }
    });

    socket.on('message', function(message) {
        const item = document.createElement('div');
        item.innerHTML = `<strong>${message.name}:</strong> ${message.text}`;
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
    });
});
