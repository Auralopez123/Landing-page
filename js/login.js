const form = document.getElementById('loginForm');
const formContent = document.getElementById('form-content');
const loginBtn = document.getElementById('loginBtn');
const loginMessage = document.getElementById('loginMessage');

formContent.innerHTML = `
  <input type="email" id="email" placeholder="Correo electrónico" required />
  <input type="password" id="password" placeholder="Contraseña" required />
`;

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://173.212.224.226:3000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      loginMessage.textContent = 'Inicio de sesión exitoso.';
      loginMessage.style.color = 'green';
      window.location.href = '../pages/dashboard.html';
    } else {
      loginMessage.textContent = data.message || 'Credenciales incorrectas.';
      loginMessage.style.color = 'red';
    }
  } catch (error) {
    console.error(error);
    loginMessage.textContent = 'Error al conectar con el servidor.';
    loginMessage.style.color = 'red';
  }
});