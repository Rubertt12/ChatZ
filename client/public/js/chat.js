document.addEventListener('DOMContentLoaded', () => {
    const chatName = localStorage.getItem('chatName');
    const chatCode = localStorage.getItem('chatCode');
    if (!chatName || !chatCode) {
        window.location.href = '/';
        return;
    }

    document.getElementById('chatCode').textContent = chatCode;

    const messages = document.getElementById('messages');

    const eventSource = new EventSource('/events');

    eventSource.onopen = () => {
        console.log('Conexão com o servidor estabelecida');
    };

    eventSource.onerror = () => {
        console.error('Erro na conexão com o servidor');
    };

    eventSource.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const item = document.createElement('div');
        item.innerHTML = `<strong>${message.name}:</strong> ${message.text}`;
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
    };

    const form = document.getElementById('messageForm');
    const input = document.getElementById('messageInput');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (input.value) {
            const message = {
                name: chatName,
                text: input.value
            };
            fetch('/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            });
            input.value = '';
        }
    });
});

