const form = document.getElementById('resetPasswordForm');
const message = document.getElementById('resetMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = document.getElementById('token').value.trim();
  const newPassword = document.getElementById('newPassword').value;
  const confirmNewPassword = document.getElementById('confirmPassword').value;

  if (newPassword !== confirmNewPassword) {
    message.textContent = '❌ Las contraseñas no coinciden.';
    message.style.color = 'red';
    return;
  }

  try {
    const response = await fetch('http://173.212.224.226:3000/users/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        newPassword,
        confirmNewPassword
      })
    });

    const data = await response.json();

    if (response.ok) {
      message.textContent = '✅ Contraseña restablecida con éxito. Ya puedes iniciar sesión.';
      message.style.color = 'green';
    } else {
      message.textContent = data.message || 'Error de validación.';
      message.style.color = 'red';
    }
  } catch (err) {
    console.error(err);
    message.textContent = 'Error de conexión con el servidor.';
    message.style.color = 'red';
  }
});
