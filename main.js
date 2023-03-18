const pokemonCards = document.getElementById("pokemon-cards");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalType = document.getElementById("modal-type");
const modalAbilities = document.getElementById("modal-abilities");
const closeModal = document.getElementsByClassName("close")[0];

// Запрос на получение списка персонажей
fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
  .then(response => response.json())
  .then(data => {
    // Извлечение ссылок на каждого персонажа
    const pokemonUrls = data.results.map(pokemon => pokemon.url);
    return Promise.all(pokemonUrls.map(url => fetch(url).then(response => response.json())));
  })
  .then(pokemonData => {
    // Создание карточки для каждого персонажа
    pokemonData.forEach(pokemon => {
      const pokemonCard = document.createElement("div");
      pokemonCard.classList.add("pokemon-card");
      pokemonCard.innerHTML = `
        <img src="${pokemon.sprites.front_default}">
        <h2>${pokemon.name}</h2>
      `;
      pokemonCard.addEventListener("click", () => {
        // Заполнение модального окна дополнительной информацией об од
        modalTitle.innerText = pokemon.name;
    modalDescription.innerText = `Height: ${pokemon.height} | Weight: ${pokemon.weight}`;
    modalType.innerText = `Type: ${pokemon.types.map(type => type.type.name).join(", ")}`;
    modalAbilities.innerText = `Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(", ")}`;
    modal.style.display = "block";
  });
  pokemonCards.appendChild(pokemonCard);
});
})
.catch(error => console.error(error));

// Закрытие модального окна при клике на кнопку "X"
closeModal.addEventListener("click", () => {
modal.style.display = "none";
});