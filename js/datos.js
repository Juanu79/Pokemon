function mostrarDatos() {
    const app = document.getElementById("app");
    
    // Validar que el elemento app exista
    if (!app) {
        console.error("No se encontró el elemento con id 'app'");
        return;
    }

    app.innerHTML = ""; // Limpiar cualquier contenido previo

    // Crear una sección para los datos del usuario
    const seccionDatos = document.createElement("section");
    seccionDatos.classList.add("datos-usuario");

    // Datos que deseas mostrar (puedes cambiar estos valores)
    const datosUsuario = {
        nombre: "Ash Ketchum",
        region: "Kanto",
        pokemonesCapturados: 150,
        meta: "¡Atrápalos a todos!"
    };

    // Generar contenido dinámico
    seccionDatos.innerHTML = `
        <h2>Información del Usuario</h2>
        <p><strong>Nombre:</strong> ${datosUsuario.nombre}</p>
        <p><strong>Región:</strong> ${datosUsuario.region}</p>
        <p><strong>Pokémones Capturados:</strong> ${datosUsuario.pokemonesCapturados}</p>
        <p><strong>Meta:</strong> ${datosUsuario.meta}</p>
    `;

    // Agregar la sección al contenedor principal
    app.appendChild(seccionDatos);
}