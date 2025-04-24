let pokemones = [];
const totalPokes = 1026; // Total real (la API empieza en 1, no en 0)

async function conexionLista() {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
        if (!res.ok) throw new Error(`Error ${res.status}: No se pudo obtener los Pokémon`);

        const data = await res.json();
        pokemones = data.results;
        return pokemones;
    } catch (error) {
        console.error("Error al conectar con la PokéAPI:", error);
        return [];
    }
}

async function General() {
    const infoPokes = await conexionLista();
    mostrarLista(infoPokes);
}

async function mostrarLista(pokemones) {
    const app = document.getElementById("app");
    app.innerHTML = ''; // limpiar contenido previo

    // Solo mostrar los primeros 20 para rendimiento
    const primerosPokemones = pokemones.slice(0, 20);

    try {
        const detalles = await Promise.all(
            primerosPokemones.map(poke => fetch(poke.url).then(res => res.json()))
        );

        detalles.forEach(data => {
            const div = document.createElement("div");
            div.className = "c-lista-pokemon";
            div.innerHTML = `
                <h3>${data.name}</h3>
                <img src="${data.sprites.front_default}" alt="${data.name}" />
            `;
            app.appendChild(div);
        });
    } catch (error) {
        app.innerHTML = `<p>Error al cargar detalles de los Pokémon.</p>`;
        console.error("Error al mostrar lista de Pokémon:", error);
    }
}
