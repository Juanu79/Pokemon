async function mostrarDetalle(id) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await res.json();

        const detalle = document.getElementById("pokemonDetail");
        detalle.innerHTML = `
            <h2>${pokemon.name} (#${pokemon.id})</h2>
            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}" width="150">
            <p><strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
            <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
            <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
            <p><strong>Habilidades:</strong> ${pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
        `;
    } catch (error) {
        console.error("Error al obtener detalles del Pokémon:", error);
    }
}
