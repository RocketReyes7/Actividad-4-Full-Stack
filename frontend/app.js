// 1. Manejo de Login
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token); // Guardamos el JWT
            window.location.href = 'dashboard.html';
        } else {
            alert('Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// 2. Manipulación Dinámica del DOM (Dashboard)
const listContainer = document.getElementById('item-list');

async function loadItems() {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/api/items', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const items = await res.json();
    
    listContainer.innerHTML = ''; // Limpiar lista
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `
            <span>${item.nombre}</span>
            <button class="btn-delete" onclick="deleteItem(${item.id})">Eliminar</button>
        `;
        listContainer.appendChild(div);
    });
}

async function deleteItem(id) {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:3000/api/items/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    loadItems(); // Recargar lista
}