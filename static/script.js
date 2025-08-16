// static/script.js

// Función para cargar contactos desde el servidor
function cargarContactos() {
    fetch('/api/contactos')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector("#contactTable tbody");
            tbody.innerHTML = "";
            data.forEach(contacto => {
                const fila = `<tr>
                    <td>${contacto.id}</td>
                    <td>${contacto.nombre}</td>
                    <td>${contacto.telefono}</td>
                    <td>
                        <button onclick="editarContacto('${contacto.id}', '${contacto.nombre}', '${contacto.telefono}')">Editar</button>
                        <button onclick="eliminarContacto('${contacto.id}')">Eliminar</button>
                    </td>
                </tr>`;
                tbody.innerHTML += fila;
            });
        });
}

// Manejo del formulario para agregar contacto
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;

    fetch('/api/contactos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, nombre, telefono })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensaje || data.error);
        cargarContactos();
        document.getElementById("contactForm").reset();
    });
});

// Función para editar un contacto
function editarContacto(id, nombre, telefono) {
    const nuevoNombre = prompt("Nuevo nombre:", nombre);
    const nuevoTelefono = prompt("Nuevo teléfono:", telefono);

    if (nuevoNombre && nuevoTelefono) {
        fetch(`/api/contactos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: nuevoNombre, telefono: nuevoTelefono })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.mensaje || data.error);
            cargarContactos();
        });
    }
}

// Función para eliminar un contacto
function eliminarContacto(id) {
    if (confirm(`¿Seguro que quieres eliminar el contacto con ID ${id}?`)) {
        fetch(`/api/contactos/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
            alert(data.mensaje || data.error);
            cargarContactos();
        });
    }
}

// Cargar contactos al iniciar
cargarContactos();