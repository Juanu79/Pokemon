// Archivo: favoritos.js
let favoritos = new Set(JSON.parse(localStorage.getItem("favoritos")) || []);

const toggleFavorito = (id, nombre) => {
    id = Number(id);
    const corazonIcono = document.getElementById(`corazon-${id}`);

    if (favoritos.has(id)) {
        favoritos.delete(id);
        corazonIcono.textContent = '🤍';
    } else {
        favoritos.add(id);
        corazonIcono.textContent = '❤️';
    }

    localStorage.setItem("favoritos", JSON.stringify([...favoritos]));
};

const actualizarIconoFavorito = (id) => {
    const corazonIcono = document.getElementById(`corazon-${id}`);
    if (corazonIcono) {
        corazonIcono.textContent = favoritos.has(Number(id)) ? '❤️' : '🤍';
    }
};

async function mostrarDetalle(id) {
    try {
        id = Number(id);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error(`Error ${res.status}: No se pudo obtener los datos`);

        const data = await res.json();
        const tipoPoke = data.types.map(t => `<span>${t.type.name}</span>`).join(" ");

        const app = document.getElementById("app");
        const esFavorito = favoritos.has(id);

        app.innerHTML = `
            <section class="c-detalle">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" 
                    alt="${data.name}" height="120" width="auto">
                <p>${data.name} (#${data.id})</p>
                <p>${tipoPoke}</p>
                <p>Altura: ${(data.height / 10).toFixed(1)} m | Peso: ${(data.weight / 10).toFixed(1)} kg</p>
                <p>HP: ${data.stats[0].base_stat} | Velocidad: ${data.stats[5].base_stat}</p>
                <p>Ataque: ${data.stats[1].base_stat} | Defensa: ${data.stats[2].base_stat}</p>
                <p>Ataque Especial: ${data.stats[3].base_stat} | Defensa Especial: ${data.stats[4].base_stat}</p>
                <button id="favorito-btn-${id}" onclick="toggleFavorito(${id}, '${data.name}')">
                    <span id="corazon-${id}" class="corazon">${esFavorito ? '❤️' : '🤍'}</span> Favorito
                </button>
            </section>
        `;

        actualizarIconoFavorito(id);
    } catch (error) {
        console.error("Error al obtener los datos del Pokémon:", error);
    }
}
