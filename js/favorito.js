function mostrarFavoritos() {
    const app = document.getElementById("app");
    app.innerHTML = "";

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.length === 0) {
        app.innerHTML = "<p>No tienes Pokémon favoritos aún. ¡Añade algunos!</p>";
        return;
    }

    const contenedor = document.createElement("section");
    contenedor.classList.add("c-lista");

    contenedor.innerHTML = favoritos.map(pokemon => `
        <div class="c-unpoke c-mios-pokemon poke-${pokemon.id}" onclick="mostrarDetalle(${pokemon.id})">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" 
                alt="${pokemon.nombre}" width="auto" height="60" loading="lazy">
            <p>${pokemon.nombre}</p>
        </div>
    `).join(""); 

    app.appendChild(contenedor);
}