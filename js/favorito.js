let favoritos = []; // Inicialmente vacío

// Ejemplo: Agregar un Pokémon a favoritos
function agregarAFavoritos(pokemon) {
    if (!favoritos.some(fav => fav.name === pokemon.name)) {
        favoritos.push(pokemon);
        console.log(`${pokemon.name} agregado a favoritos.`);
    } else {
        console.log(`${pokemon.name} ya está en favoritos.`);
    }
}

function mostrarFavoritos() {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpiar contenido previo

    const contenedor = document.createElement("section");
    contenedor.classList.add("c-lista");

    if (favoritos.length === 0) {
        contenedor.innerHTML = "<p>No tienes Pokémon favoritos aún.</p>";
    } else {
        contenedor.innerHTML = generarLista(favoritos);
    }

    app.appendChild(contenedor);
}