function mostrarMios() {
    const app = document.getElementById("app");
    
    // Asegurarse de que el elemento existe
    if (!app) {
        console.error("No se encontró el elemento con id 'app'");
        return;
    }

    app.innerHTML = ""; // Limpiar el contenido del contenedor principal
    const seccion = document.createElement("section");
    seccion.classList.add("c-lista", "c-mios");

    let misPokes = "";

    // Verificar que las variables globales totalPokes y misNumeros están definidas
    if (typeof totalPokes === "undefined" || !Array.isArray(misNumeros)) {
        console.error("Las variables globales 'totalPokes' o 'misNumeros' no están definidas correctamente.");
        return;
    }

    for (let i = 1; i <= totalPokes; i++) { // Usar `<=` para incluir el total
        if (misNumeros.includes(i)) {
            misPokes += `
                <div class="c-unpoke c-mios-pokemon poke-${i}" onclick="mostrarDetalle('${i}')">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png" 
                         width="auto" height="45" loading="lazy" alt="Pokemon ${i}">
                    <p>${i}</p>
                </div>`;
        } else {
            misPokes += `
                <div class="c-unpoke">
                    <p>${i}</p>
                </div>`;
        }
    }

    seccion.innerHTML = misPokes;

    // Crear y agregar un contador
    const contador = document.createElement("p");
    contador.textContent = `${misNumeros.length} / ${totalPokes}`;
    app.appendChild(contador);
    app.appendChild(seccion);
}