var misNumeros = new Set(JSON.parse(localStorage.getItem("misNumeros")) || []);

function mostrarAleatorio(pokemones, totalPokes = 151) { // Asumiendo 151 como total de Pokémon
    const app = document.getElementById("app");
    let pokesAleatorios = '<section class="c-aleatorio c-lista">';

    while (misNumeros.size < 4) { // Genera hasta tener 4 únicos
        let num = Math.floor(Math.random() * totalPokes) + 1;
        misNumeros.add(num);
    }

    localStorage.setItem("misNumeros", JSON.stringify([...misNumeros])); // Guarda como array

    [...misNumeros].slice(-4).forEach(num => { // Solo toma los últimos 4 números generados
        pokesAleatorios += `
        <div class="c-lista-pokemon c-un_aleatorio">
            <p>${num}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${num}.png" alt="${pokemones[num - 1]?.name || 'Desconocido'}" width="60" height="60">
            <p>${pokemones[num - 1]?.name || 'Desconocido'}</p>
        </div>`;
    });

    pokesAleatorios += "</section>";
    app.innerHTML = pokesAleatorios;
}