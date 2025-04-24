function mostrarLista(pokemones) {
    const lista = document.getElementById("pokemonList");
    lista.innerHTML = generarLista(pokemones); // Solo se actualiza la lista
}

function generarLista(pokemones) {
    let listaHTML = "";
    for (let i = 0; i < pokemones.length; i++) {
        let id = pokemones[i].url.split("/")[6];
        listaHTML += `
        <div class="c-lista-pokemon poke-${id}" onclick="mostrarDetalle('${id}')">
            <p>#${id}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" height="60" alt="${pokemones[i].name}">
            <p>${pokemones[i].name}</p>
        </div>`;
    }
    return listaHTML;
}

function filtrarPokemon() {
    const texto = document.getElementById("searchInput").value.toLowerCase();

    if (texto.length < 3 && isNaN(texto)) return;

    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
        .then(res => res.json())
        .then(data => {
            let filtrados = [];
            if (isNaN(texto)) {
                filtrados = data.results.filter(p => p.name.includes(texto));
            } else {
                filtrados = data.results.filter(p => p.url.includes("/" + texto + "/"));
            }
            mostrarLista(filtrados);
        });
}

async function filtrarPorTipo(tipo) {
    if (tipo === "all") {
        General();
    } else {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
            const data = await res.json();
            const pokemonesFiltrados = data.pokemon.map(p => p.pokemon);
            mostrarLista(pokemonesFiltrados);
        } catch (error) {
            console.error("Error al filtrar por tipo:", error);
            document.getElementById("pokemonList").innerHTML = `<p>Error al cargar Pokémon de tipo "${tipo}".</p>`;
        }
    }
}
