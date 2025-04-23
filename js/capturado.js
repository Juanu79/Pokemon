// capturado.js

function mostrarCapturados() {
    const app = document.getElementById("app");
    const seccion = document.createElement("section");
    seccion.classList.add("c-lista", "c-mios");

    let misPokes = "";
    const totalPokes = 1026; // Ajustado considerando el índice 0
    const misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];

    for (let i = 1; i < totalPokes; i++) {
        misPokes += misNumeros.includes(i) 
            ? `<div class="c-unpoke c-mios-pokemon poke-${i}" onclick="mostrarDetalle('${i}')">
                 <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png" width="auto" height="45" loading="lazy" alt="Pokemon ${i}">
                 <p>${i}</p>
               </div>`
            : `<div class="c-unpoke"><p>${i}</p></div>`;
    }

    seccion.innerHTML = misPokes;

    const contador = document.createElement("p");
    contador.textContent = `Capturados: ${misNumeros.length} / ${totalPokes}`;
    
    app.appendChild(contador);
    app.appendChild(seccion);
}

// Ejecutar la función cuando se cargue la página
document.addEventListener("DOMContentLoaded", mostrarCapturados);