const token = localStorage.getItem('token');
console.log('Token cargado:', token);

if (!token) {
  window.location.href = 'login.html';
}

async function fetchData() {
  try {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Obtener perfil del usuario
    const userRes = await fetch('http://173.212.224.226:3000/users/profile', { headers });
    if (userRes.status === 401) {
      console.warn('Token inválido, redireccionando...');
      localStorage.removeItem('token');
      window.location.href = 'login.html';
      return;
    }
    const user = await userRes.json();
    document.getElementById('userEmail').textContent = user.email || '--';

    // Obtener productos
    const productRes = await fetch('http://173.212.224.226:3000/products', { headers });
    const products = await productRes.json();
    if (!Array.isArray(products)) {
      console.error('Error: productos no es un array:', products);
      return;
    }
    document.getElementById('productCount').textContent = products.length;

    // Obtener categorías
    const categoryRes = await fetch('http://173.212.224.226:3000/categories', { headers });
    const categories = await categoryRes.json();
    if (!Array.isArray(categories)) {
      console.error('Error: categorías no es un array:', categories);
      return;
    }
    document.getElementById('categoryCount').textContent = categories.length;

    // Gráfico de inventario por categoría
    const categoryMap = {};
    products.forEach(p => {
      const cat = p.category?.name || 'Sin categoría';
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });
    renderChart('inventoryChart', Object.keys(categoryMap), Object.values(categoryMap), 'Inventario por categoría');

    // Gráfico de productos recientes
    const sorted = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
    const recentLabels = sorted.map(p => p.name || 'Producto');
    const recentValues = sorted.map(p => p.quantity || 0);
    renderChart('recentProductsChart', recentLabels, recentValues, 'Últimos productos agregados');

  } catch (error) {
    console.error('Error al cargar datos del dashboard:', error);
  }
}

function renderChart(canvasId, labels, data, label = '') {
  const ctx = document.getElementById(canvasId)?.getContext('2d');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: label,
        data,
        backgroundColor: '#2563EB'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

fetchData();
