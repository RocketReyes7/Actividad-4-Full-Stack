// dashboard.js

async function loadItems() {
    const token = localStorage.getItem('token'); 
    
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    try {
        // Asegúrate de usar la URL completa de tu servidor (ej. http://localhost:3000)
        const response = await fetch('http://localhost:3000/api/items', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const result = await response.json(); // 'result' contiene {success, data}
        const tableBody = document.getElementById('itemsTableBody');

        // IMPORTANTE: Accedemos a result.data que es donde está el array
        tableBody.innerHTML = result.data.map(item => `
            <tr>
                <td>${item._id}</td> <td><strong>${item.nombre}</strong></td>
                <td>${item.descripcion || 'Sin descripción'}</td>
                <td>$${item.precio}</td>
                <td>
                    <button onclick="editarItem('${item._id}', '${item.nombre}', '${item.descripcion}', ${item.precio})" class="btn-edit">✏️</button>
                    <button onclick="eliminarItem('${item._id}')" class="btn-delete">🗑️</button>
                </td>
            </tr>2
        `).join('');
    } catch (error) {
        console.error('Error al cargar items:', error);
    }
}

// 1. Función para Eliminar un Item
async function eliminarItem(id) {
    if (!confirm('¿Estás seguro de eliminar este registro?')) return;

    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`/api/items/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            alert('Item eliminado correctamente');
            loadItems(); 
        } else {
            alert('Error al eliminar el item');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// 2. Función para Agregar un Item
async function agregarItem() {
    const nombre = prompt("Nombre del nuevo item:");
    if (!nombre) return;
    
    const descripcion = prompt("Descripción:");
    const precio = prompt("Precio:");
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            // Asegúrate de enviar los nombres exactos que espera el controlador
            body: JSON.stringify({ nombre, descripcion, precio: parseFloat(precio) })
        });

        if (response.ok) {
            loadItems();
        } else {
            alert('Error al crear el item');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// 3. NUEVA: Función para Editar un Item
async function editarItem(id, nombreAct, descAct, precioAct) {
    // Pedimos los nuevos datos usando los actuales como valor por defecto
    const nombre = prompt("Nuevo nombre:", nombreAct);
    if (!nombre) return; // Cancelar si no hay nombre
    
    const descripcion = prompt("Nueva descripción:", descAct);
    const precio = prompt("Nuevo precio:", precioAct);
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`/api/items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                nombre, 
                descripcion, 
                precio: parseFloat(precio) 
            })
        });

        if (response.ok) {
            alert('Item actualizado con éxito');
            loadItems();
        } else {
            alert('Error al actualizar');
        }
    } catch (error) {
        console.error('Error al editar:', error);
    }
}

// 4. Función para Cerrar Sesión
function logout() {
    localStorage.removeItem('token'); 
    window.location.href = 'index.html';
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadItems();
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
});