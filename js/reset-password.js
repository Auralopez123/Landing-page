const form = document.getElementById('resetPasswordForm');
const message = document.getElementById('resetMessage');

// Autocompletar token si viene en la URL
const urlParams = new URLSearchParams(window.location.search);
const tokenFromUrl = urlParams.get('token');
if (tokenFromUrl) {
  document.getElementById('token').value = tokenFromUrl;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = document.getElementById('token').value.trim();
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (newPassword !== confirmPassword) {
    message.textContent = 'Las contraseñas no coinciden.';
    message.style.color = 'red';
    return;
  }

  try {
    const response = await fetch('http://173.212.224.226:3000/users/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword })
    });

    const data = await response.json();

    if (response.ok) {
      message.textContent = '✅ Tu contraseña fue restablecida con éxito.';
      message.style.color = 'green';
    } else {
      message.textContent = data.message || 'Error al restablecer la contraseña.';
      message.style.color = 'red';
    }
  } catch (error) {
    console.error(error);
    message.textContent = 'Error de conexión con el servidor.';
    message.style.color = 'red';
  }
});

