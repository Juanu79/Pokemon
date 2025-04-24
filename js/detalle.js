async function mostrarDetalle(id) {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
        if (!res.ok) {
            throw new Error('Error al obtener datos del Pokémon');
        }
        const data = await res.json();

        // Código para mostrar el detalle
        let tipoPoke = "";
        for (let i = 0; i < data.types.length; i++) {
            tipoPoke += `<span>${data.types[i].type.name}</span>`;
        }

        const app = document.getElementById("app");
        const esFavorito = favoritos.some(pokemon => Number(pokemon.id) === id);

        const detalle = `
            <section class="c-detalle">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" alt="${data.name}" height="120" width="auto">
                <p>${data.name}</p>
                <p>${data.id}</p>
                <p>${tipoPoke}</p>
                <p>Altura: ${data.height / 10} m / Peso: ${data.weight / 10} km</p>
                <p>hp: ${data.stats[0].base_stat}</p>
                <p>Velocidad: ${data.stats[5].base_stat}</p>
                <p>Ataque: ${data.stats[1].base_stat} Defensa: ${data.stats[2].base_stat}</p>
                <p>Ataque Especial: ${data.stats[3].base_stat} Defensa Especial: ${data.stats[4].base_stat}</p>

                <button id="favorito-btn-${id}" onclick="toggleFavorito(${id}, '${data.name}')">
                    <span id="corazon-${id}" class="corazon">${esFavorito ? '❤️' : '🤍'}</span> Favorito
                </button>
            </section>
        `;

        app.innerHTML = detalle;
        actualizarIconoFavorito(id);
    } catch (error) {
        console.error("Error en mostrarDetalle:", error);
        const app = document.getElementById("app");
        app.innerHTML = "<p>Error al cargar el detalle del Pokémon. Verifica tu conexión o intenta de nuevo.</p>";
    }
}
