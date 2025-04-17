const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');
const tokenConfirmation = document.getElementById('tokenConfirmation');
const tokenInput = document.getElementById('tokenInput');
const confirmTokenBtn = document.getElementById('confirmTokenBtn');
const tokenMessage = document.getElementById('tokenMessage');

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const companyName = document.getElementById('companyName').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validación simple de coincidencia de contraseñas
  if (password !== confirmPassword) {
    registerMessage.textContent = 'Las contraseñas no coinciden.';
    registerMessage.style.color = 'red';
    return;
  }

  try {
    const response = await fetch('http://173.212.224.226:3000/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName,
        companyName,
        phone,
        email,
        password,
        confirmPassword
      })
    });

    const data = await response.json();

    if (response.ok) {
      registerMessage.textContent = 'Registro exitoso. Revisa tu correo para confirmar.';
      registerMessage.style.color = 'green';
      tokenConfirmation.style.display = 'block';
    } else {
      registerMessage.textContent = data.message || 'Error en el registro.';
      registerMessage.style.color = 'red';
    }
  } catch (error) {
    console.error(error);
    registerMessage.textContent = 'Error al conectar con el servidor.';
    registerMessage.style.color = 'red';
  }
});

confirmTokenBtn.addEventListener('click', async () => {
  const token = tokenInput.value;

  try {
    const response = await fetch('http://173.212.224.226:3000/users/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });

    const data = await response.json();

    if (response.ok) {
      tokenMessage.textContent = 'Token confirmado. Ya puedes iniciar sesión.';
      tokenMessage.style.color = 'green';
    } else {
      tokenMessage.textContent = data.message || 'Token inválido o expirado.';
      tokenMessage.style.color = 'red';
    }
  } catch (error) {
    console.error(error);
    tokenMessage.textContent = 'Error al conectar con el servidor.';
    tokenMessage.style.color = 'red';
  }
});

// Validaciones visuales de contraseña
registerForm.addEventListener('input', () => {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  document.getElementById('length').classList.toggle('valid', password.length >= 8);
  document.getElementById('uppercase').classList.toggle('valid', /[A-Z]/.test(password));
  document.getElementById('lowercase').classList.toggle('valid', /[a-z]/.test(password));
  document.getElementById('number').classList.toggle('valid', /\d/.test(password));
  document.getElementById('special').classList.toggle('valid', /[!@#$%^&*]/.test(password));

  const matchMessage = document.getElementById('passwordMatchMessage');
  if (password && password === confirmPassword) {
    matchMessage.textContent = 'Las contraseñas coinciden.';
    matchMessage.classList.add('valid');
    matchMessage.classList.remove('invalid');
  } else {
    matchMessage.textContent = 'Las contraseñas no coinciden.';
    matchMessage.classList.add('invalid');
    matchMessage.classList.remove('valid');
  }
});