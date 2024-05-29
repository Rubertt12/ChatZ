document.getElementById('entryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('nameInput').value;
    const code = document.getElementById('codeInput').value;
    if (name && code) {
        localStorage.setItem('chatName', name);
        localStorage.setItem('chatCode', code);
        window.location.href = '/chat';
    }
});

document.getElementById('generateCodeBtn').addEventListener('click', function() {
    const code = generateRandomCode();
    document.getElementById('generatedCode').textContent = `Código Gerado: ${code}`;
    document.getElementById('codeInput').value = code;
});

function generateRandomCode() {
    return Math.random().toString(36).substring(2, 10); // Gera um código alfanumérico de 8 caracteres
}
