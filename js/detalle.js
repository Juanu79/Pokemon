function mostrarfavoritos() {
    const app = document.getElementById("app");
    app.innerHTML = "";

    // Cargar favoritos desde localStorage
    favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.length === 0) {
        app.innerHTML = "<p>No hay Pokémon favoritos aún.</p>";
        return;
    }

    const contenedor = document.createElement("section");
    contenedor.classList.add("c-lista");
    contenedor.innerHTML = generarLista(favoritos); // Reutiliza generador adaptado

    app.appendChild(contenedor);
}

function generarLista(pokemones) {
    let listaHTML = "";
    for (let i = 0; i < pokemones.length; i++) {
        // Detecta si el objeto tiene id directo o necesita extraerlo desde la URL
        let id = pokemones[i].id || pokemones[i].url.split("/")[6];
        let nombre = pokemones[i].name || pokemones[i].nombre;

        listaHTML += `
        <div class="c-lista-pokemon poke-${id}" onclick="mostrarDetalle('${id}')">
            <p>#${id}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" width="auto" height="60" loading="lazy" alt="${nombre}">
            <p>${nombre}</p>
        </div>`;
    }

    return listaHTML;
}
