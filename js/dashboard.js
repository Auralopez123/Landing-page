import Chart from 'chart.js/auto';

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

    const [userRes, productRes, categoryRes] = await Promise.all([
      fetch('http://173.212.224.226:3000/users/profile', { headers }),
      fetch('http://173.212.224.226:3000/products', { headers }),
      fetch('http://173.212.224.226:3000/categories', { headers })
    ]);

    const userData = await userRes.json();
    const productData = await productRes.json();
    const categoryData = await categoryRes.json();

    const user = userData.data;
    const products = productData.data || [];
    const categories = categoryData.data || [];

    document.getElementById('userEmail').textContent = user?.email || '--';
    document.getElementById('productCount').textContent = products.length;
    document.getElementById('categoryCount').textContent = categories.length;

    // Crear mapa de categorías para fácil acceso
    const categoryMap = {};
    categories.forEach(c => {
      categoryMap[c.id] = c.name;
    });

    // Renderizar tabla productos
    const productTable = document.getElementById('productsTable');
    productTable.innerHTML = products.map(p => `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${categoryMap[p.categoryId] || 'Sin categoría'}</td>
        <td>${p.quantity}</td>
        <td>${p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '--'}</td>
      </tr>
    `).join('');

    // Renderizar tabla categorias
    const categoryTable = document.getElementById('categoriesTable');
    categoryTable.innerHTML = categories.map(c => `
      <tr>
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '--'}</td>
      </tr>
    `).join('');

    // Gráfico de inventario por categoría
    const grouped = {};
    products.forEach(p => {
      const name = categoryMap[p.categoryId] || 'Sin categoría';
      grouped[name] = (grouped[name] || 0) + (p.quantity || 0);
    });
    renderChart('inventoryChart', Object.keys(grouped), Object.values(grouped), 'Inventario por categoría');

    // Gráfico de productos recientes
    const recent = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
    const recentLabels = recent.map(p => p.name);
    const recentValues = recent.map(p => p.quantity);
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
      datasets: [
        {
          label: label,
          data,
          backgroundColor: '#2563EB'
        }
      ]
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
