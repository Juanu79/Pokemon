function mostrarLista(pokemones) {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpia el contenido antes de mostrar la nueva lista

    // Crear sección de lista
    const seccion = document.createElement("section");
    seccion.classList.add("c-lista");

    // Buscador de Pokémon
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar Pokémon...";
    buscador.addEventListener("input", evento => buscarPoke(evento, pokemones));

    // Filtros de tipo
    const tipos = [
        "All", "normal", "fighting", "flying", "poison", "ground", "rock",
        "bug", "ghost", "steel", "fire", "water", "grass", "electric",
        "psychic", "ice", "dragon", "dark", "fairy", "stellar", "shadow", "unknown"
    ];

    const filtro = document.createElement("div");
    filtro.classList.add("filtro");

    filtro.innerHTML = tipos.map(tipo => `<button onclick="filtrarPorTipo('${tipo}')">${tipo}</button>`).join("");

    // Generar la lista inicial de Pokémon
    seccion.innerHTML = generarLista(pokemones);

    // Agregar elementos al DOM
    app.append(buscador, filtro, seccion);
}

function generarLista(pokemones) {
    return pokemones.map(pokemon => {
        let id = pokemon.url.split("/")[6];
        return `
        <div class="c-lista-pokemon poke-${id}" onclick="mostrarDetalle('${id}')">
            <p>#${id}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" 
                width="auto" height="60" loading="lazy" alt="${pokemon.name}">
            <p>${pokemon.name}</p>
        </div>`;
    }).join(""); 
}

function buscarPoke(evento, pokemones) {
    const texto = evento.target.value.toLowerCase();
    const listaFiltrada = texto.length >= 3 && isNaN(texto)
        ? pokemones.filter(pokemon => pokemon.name.includes(texto))
        : !isNaN(texto)
        ? pokemones.filter(pokemon => pokemon.url.includes("/" + texto))
        : pokemones;

    document.querySelector(".c-lista").innerHTML = generarLista(listaFiltrada);
}

async function filtrarPorTipo(untipo) {
    if (untipo === "All") {
        conexionLista();
        return;
    }

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/type/${untipo}`);
        if (!respuesta.ok) throw new Error(`Error ${respuesta.status}: No se pudo obtener Pokémon de tipo "${untipo}"`);

        const datos = await respuesta.json();
        const pokemonesFiltrados = datos.pokemon.map(p => p.pokemon);

        mostrarLista(pokemonesFiltrados);
    } catch (error) {
        console.error("Error al filtrar por tipo:", error);
        document.getElementById("app").innerHTML = `<p>Error al cargar Pokémon de tipo "${untipo}".</p>`;
    }
}



async function filtrarPorTipo(untipo) {
    if(untipo == "All"){
        conexionLista()
    }else{
        try {
            const respuesta = await fetch(`https://pokeapi.co/api/v2/type/${untipo}`);
            const datos = await respuesta.json();
    
            const pokemonesFiltrados = datos.pokemon.map(p => p.pokemon);
    
            mostrarLista(pokemonesFiltrados);
        } catch (error) {
            console.error("Error al filtrar por tipo:", error);
            document.getElementById("app").innerHTML = `<p>Error al cargar Pokémon de tipo "${untipo}".</p>`;
        }
    }
}