const form = document.getElementById('registerForm');
const message = document.getElementById('message');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = form.username.value.trim();
    const password = form.password.value;
    const email = form.email.value.trim();

    if (!username || !password || !email) {
        showMessage('Please complete all fields.', 'error');
        return;
    }

    showMessage(`Thanks, ${username}! Your account request was received.`, 'success');
    form.reset();
});

function showMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type}`;
}
