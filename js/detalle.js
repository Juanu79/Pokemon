async function mostrarDetalle(id, nombre = null) {
    id = Number(id);

    let data;
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
        data = await res.json();
        nombre = data.name; // En caso de que no se haya pasado como parámetro
    } catch (error) {
        document.getElementById("app").innerHTML = `<p>Error al cargar los detalles del Pokémon.</p>`;
        return;
    }

    let tipoPoke = "";
    for (let i = 0; i < data.types.length; i++) {
        tipoPoke += `<span>${data.types[i].type.name}</span>`;
    }

    const app = document.getElementById("app");
    const esFavorito = favoritos.some(pokemon => Number(pokemon.id) === id);

    const detalle = `
    <section class="c-detalle">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" alt="${nombre}" height="120" width="auto">
        <p>${nombre}</p>
        <p>#${data.id}</p>
        <p>${tipoPoke}</p>
        <p>Altura: ${data.height / 10} m / Peso: ${data.weight / 10} kg</p>
        <p>HP: ${data.stats[0].base_stat}</p>
        <p>Velocidad: ${data.stats[5].base_stat}</p>
        <p>Ataque: ${data.stats[1].base_stat} / Defensa: ${data.stats[2].base_stat}</p>
        <p>Ataque Esp.: ${data.stats[3].base_stat} / Defensa Esp.: ${data.stats[4].base_stat}</p>

        <button id="favorito-btn-${id}" onclick="toggleFavorito(${id}, '${nombre}')">
            <span id="corazon-${id}" class="corazon">${esFavorito ? '❤️' : '🤍'}</span> Favorito
        </button>
    </section>
    `;

    app.innerHTML = detalle;
    actualizarIconoFavorito(id);
}
