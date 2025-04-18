const forgotForm = document.getElementById('forgotPasswordForm');
const forgotMessage = document.getElementById('forgotMessage');

forgotForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;

  try {
    const response = await fetch('http://173.212.224.226:3000/users/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (response.ok) {
      forgotMessage.innerHTML = '✅ Revisa tu correo para continuar el proceso.';
      forgotMessage.style.color = 'green';

      // Redirige a restablecer-password.html después de unos segundos (opcional)
      setTimeout(() => {
        window.location.href = 'restablecer-password.html';
      }, 2000);
    } else {
      forgotMessage.textContent = data.message || 'Error al enviar correo.';
      forgotMessage.style.color = 'red';
    }
  } catch (err) {
    console.error(err);
    forgotMessage.textContent = 'Error de conexión.';
    forgotMessage.style.color = 'red';
  }
});




