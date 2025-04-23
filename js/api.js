let pokemones = [];
const totalPokes = 1026; // Se ajusta debido a que el índice comienza en 0

async function conexionLista() {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
        if (!res.ok) throw new Error(`Error ${res.status}: No se pudo obtener los Pokémon`);

        const data = await res.json();
        pokemones = data.results;
        
        mostrarLista(pokemones); // Llamada a función externa
    } catch (error) {
        console.error("Error al conectar con la PokéAPI:", error);
    }
}

conexionLista();