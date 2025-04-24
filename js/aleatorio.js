async function mostraraleatorio() {
    const app = document.getElementById("app");
    app.innerHTML = "<p>Cargando Pokémon aleatorio...</p>";

    const randomId = Math.floor(Math.random() * 1010) + 1; // entre 1 y 1010

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const pokemon = await respuesta.json();

        app.innerHTML = `
            <div class="pokemon-aleatorio">
                <h2>${pokemon.name.toUpperCase()} (#${pokemon.id})</h2>
                <img src="${pokemon.sprites.other['official-artwork'].front_default}" 
                     alt="${pokemon.name}" 
                     width="200" 
                     height="200" />
                <p><strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
            </div>
        `;
    } catch (error) {
        app.innerHTML = `<p>Error al cargar Pokémon aleatorio.</p>`;
        console.error("Error:", error);
    }
}



