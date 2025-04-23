function mostrarDatos() {
    const app = document.getElementById("app");
    
    app.innerHTML = `
        <section class="c-datos">
            <h2>Datos del Usuario</h2>
            <p>Nombre: <strong>Entrenador Pokémon</strong></p>
            <p>Pokémon favoritos: <strong>Pikachu, Charizard, Bulbasaur</strong></p>
        </section>
    `;
}