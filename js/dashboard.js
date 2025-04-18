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

    // Obtener perfil del usuario
    const userRes = await fetch('http://173.212.224.226:3000/users/profile', { headers });
    const userData = await userRes.json();
    document.getElementById('userEmail').textContent = userData.data?.email || '--';

    // Obtener productos
    const productRes = await fetch('http://173.212.224.226:3000/products', { headers });
    const productData = await productRes.json();
    const products = productData.data || [];
    document.getElementById('productCount').textContent = products.length;

    // Obtener categorias
    const categoryRes = await fetch('http://173.212.224.226:3000/categories', { headers });
    const categoryData = await categoryRes.json();
    const categories = categoryData.data || [];
    document.getElementById('categoryCount').textContent = categories.length;

    // Renderizar tabla productos
    const productTable = document.getElementById('productsTable');
    productTable.innerHTML = products.map(p => `
      <tr>
        <td>${p._id}</td>
        <td>${p.name}</td>
        <td>${p.category?.name || 'Sin categoría'}</td>
        <td>${p.quantity}</td>
        <td>${new Date(p.createdAt).toLocaleDateString()}</td>
      </tr>
    `).join('');

    // Renderizar tabla categorias
    const categoryTable = document.getElementById('categoriesTable');
    categoryTable.innerHTML = categories.map(c => `
      <tr>
        <td>${c._id}</td>
        <td>${c.name}</td>
        <td>${new Date(c.createdAt).toLocaleDateString()}</td>
      </tr>
    `).join('');

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
    renderChart('recentProductsChart', recentLabels, recentValues, 'Ultimos productos agregados');

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

