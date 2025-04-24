// Lista global de favoritos
let favoritos = [];

// Variable para guardar el Pokémon que se muestra en detalle
let pokemonActual = null;

// Función para mostrar los detalles de un Pokémon
async function mostrarDetalle(id) {
    const app = document.getElementById("app");
    app.innerHTML = "Cargando...";

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await respuesta.json();

        // Guardar el Pokémon actual
        pokemonActual = {
            name: pokemon.name,
            url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`
        };

        // Mostrar información
        app.innerHTML = `
            <div class="detalle">
                <h2>${pokemon.name}</h2>
                <img src="${pokemon.sprites.other['official-artwork'].front_default}" 
                     alt="${pokemon.name}" width="200" />
                <p>Tipo: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                <button onclick="agregarAFavoritos(pokemonActual)">Agregar a Favoritos</button>
            </div>
        `;
    } catch (error) {
        app.innerHTML = "<p>Error al cargar detalles del Pokémon.</p>";
    }
}

// Función para agregar a favoritos sin duplicados
function agregarAFavoritos(pokemon) {
    const existe = favoritos.some(p => p.name === pokemon.name);
    if (!existe) {
        favoritos.push(pokemon);
        alert(`${pokemon.name} agregado a favoritos.`);
    } else {
        alert(`${pokemon.name} ya está en favoritos.`);
    }
}

// Mostrar favoritos en una lista
function mostrarfavoritos() {
    const app = document.getElementById("app");
    app.innerHTML = "";

    const contenedor = document.createElement("section");
    contenedor.classList.add("c-lista");
    contenedor.innerHTML = generarLista(favoritos); // Usa la misma función de lista general

    app.appendChild(contenedor);
}
