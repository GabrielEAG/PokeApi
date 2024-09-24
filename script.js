let listaPokemon = [];

// Función para buscar un Pokémon en la PokeAPI
async function buscarPokemon() {
  const nombre = document.getElementById("poke-name").value.trim().toLowerCase();

  if (!nombre) {
    alert("Por favor, ingresa el nombre o ID del Pokémon.");
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    if (!response.ok) {
      alert("No se encontró ningún Pokémon con ese nombre o ID.");
      return;
    }

    const pokemon = await response.json();
    mostrarPokemon(pokemon);
  } catch (error) {
    console.error("Error al buscar el Pokémon:", error);
    alert("Hubo un error al buscar el Pokémon.");
  }
}

// Función para mostrar la información del Pokémon encontrado
function mostrarPokemon(pokemon) {
  const pokeInfoDiv = document.getElementById("poke-info");

  // Obtener los tipos del Pokémon
  const tipos = pokemon.types.map(type => type.type.name).join(", ");

  pokeInfoDiv.innerHTML = `
    <h2>${pokemon.name.toUpperCase()} (#${pokemon.id})</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <p>Altura: ${pokemon.height} | Peso: ${pokemon.weight}</p>
    <p>Tipo: ${tipos}</p> <!-- Agregar tipos aquí -->
    <p>Habilidades: ${pokemon.abilities.map(ability => ability.ability.name).join(", ")}</p>
    <button onclick="agregarAPersonal('${pokemon.name}', '${pokemon.sprites.front_default}')">Añadir Pokémon</button>
  `;
}

// Función para agregar el Pokémon a la lista personal
function agregarAPersonal(nombre, imagen) {
  const nuevoPokemon = { nombre, imagen };
  listaPokemon.push(nuevoPokemon);
  mostrarLista();
}

// Función para mostrar la lista personal de Pokémon en un div
function mostrarLista() {
  const pokeListDiv = document.getElementById("poke-list");
  pokeListDiv.innerHTML = ""; // Limpiar el div antes de añadir los datos

  listaPokemon.forEach((pokemon, index) => {
    const pokeItemDiv = document.createElement("div");
    pokeItemDiv.classList.add("poke-item");

    pokeItemDiv.innerHTML = `
      <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
      <input type="text" value="${pokemon.nombre}" onchange="editarPokemon(${index}, this.value)" />
      <button onclick="eliminarPokemon(${index})">Eliminar</button>
    `;

    pokeListDiv.appendChild(pokeItemDiv);
  });
}

// Función para editar el nombre del Pokémon en la lista personal
function editarPokemon(index, nuevoNombre) {
  listaPokemon[index].nombre = nuevoNombre;
  mostrarLista(); // Refrescar la lista después de la edición
}

// Función para eliminar un Pokémon de la lista personal
function eliminarPokemon(index) {
  listaPokemon.splice(index, 1);
  mostrarLista();
}
