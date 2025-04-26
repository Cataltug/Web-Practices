const searchInput = document.querySelector("#poke-input");
const searchBtn = document.querySelector(".btn-search");
const pokeContainer = document.querySelector(".poke-container");
const typeFilter = document.querySelector("#type-filter");
const pokeCount = 151;
const battleBtn = document.querySelector(".btn-battle");  
battleBtn.addEventListener("click", startBattle);
let selectedPokemons = [];

const typeAdvantages = {
    normal: { strongAgainst: [], weakAgainst: ["rock", "steel"], immuneTo: ["ghost"] },
    fire: { strongAgainst: ["grass", "bug", "ice", "steel"], weakAgainst: ["water", "rock", "fire", "dragon"] },
    water: { strongAgainst: ["fire", "ground", "rock"], weakAgainst: ["water", "grass", "dragon"] },
    electric: { strongAgainst: ["water", "flying"], weakAgainst: ["electric", "grass", "dragon"], immuneTo: ["ground"] },
    grass: { strongAgainst: ["water", "ground", "rock"], weakAgainst: ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"] },
    ice: { strongAgainst: ["grass", "ground", "flying", "dragon"], weakAgainst: ["fire", "water", "ice", "steel"] },
    fighting: { strongAgainst: ["normal", "rock", "steel", "ice", "dark"], weakAgainst: ["flying", "poison", "psychic", "bug", "fairy"], immuneTo: ["ghost"] },
    poison: { strongAgainst: ["grass", "fairy"], weakAgainst: ["poison", "ground", "rock", "ghost"], immuneTo: ["steel"] },
    ground: { strongAgainst: ["fire", "electric", "poison", "rock", "steel"], weakAgainst: ["grass", "bug"], immuneTo: ["flying"] },
    flying: { strongAgainst: ["grass", "fighting", "bug"], weakAgainst: ["electric", "rock", "steel"] },
    psychic: { strongAgainst: ["fighting", "poison"], weakAgainst: ["psychic", "steel"], immuneTo: ["dark"] },
    bug: { strongAgainst: ["grass", "psychic", "dark"], weakAgainst: ["fire", "fighting", "poison", "flying", "ghost", "steel", "fairy"] },
    rock: { strongAgainst: ["fire", "ice", "flying", "bug"], weakAgainst: ["fighting", "ground", "steel"] },
    ghost: { strongAgainst: ["psychic", "ghost"], weakAgainst: ["dark"], immuneTo: ["normal", "fighting"] },
    dragon: { strongAgainst: ["dragon"], weakAgainst: ["steel"], immuneTo: ["fairy"] },
    dark: { strongAgainst: ["psychic", "ghost"], weakAgainst: ["fighting", "dark", "fairy"] },
    steel: { strongAgainst: ["ice", "rock", "fairy"], weakAgainst: ["fire", "water", "electric", "steel"] },
    fairy: { strongAgainst: ["fighting", "dragon", "dark"], weakAgainst: ["fire", "poison", "steel"] }
};

const colors = { // Background colors for different Pokémon types
    Fire: "#FDDFDF",
    Grass: "#DEFDE0",
    Electric: "#FCF7DE",
    Water: "#DEF3FD",
    Ground: "#f4e7da",
    Rock: "#d5d5d4",
    Fairy: "#fceaff",
    Poison: "#d6b3ff",
    Bug: "#f8d5a3",
    Dragon: "#97b3e6",
    Psychic: "#eaeda1",
    Flying: "#F5F5F5",
    Fighting: "#E6E0D4",
    Normal: "#F5F5F5",
    Ice: "#e0f5ff ",
}


const initPokemon = async () => {
    for(let i = 1; i <= pokeCount; i++){
        await getPokemon(i);
    }
};

const getPokemon = async (id) => { // Fetch Pokémon data from API
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`
    let res = await fetch(url);
    let data = await res.json();
    createPokemonBox(data);
};

const createPokemonBox = (pokemon) => {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, "0");
    const attackRate = pokemon.stats[1].base_stat;
    const hp =pokemon.stats[0].base_stat;
    const type = pokemon.types[0].type.name[0].toUpperCase() + pokemon.types[0].type.name.slice(1);
    const color = colors[type];

    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("poke-box");
    pokemonEl.style.backgroundColor = `${color}`;


    pokemonEl.innerHTML = `
    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="${name} image"/>
    <h4 class="poke-name">${name}</h4>
    <p class="poke-id">#${id}</p>
    <p class="poke-hp">HP: ${hp}</p>
    <p class="poke-attack">Attack Rate: ${attackRate}</p>
    <p class="poke-type">Type: ${type}</p>
    `;


    pokemonEl.addEventListener("click", () => {
        if (selectedPokemons.includes(pokemonEl)) {
            selectedPokemons = selectedPokemons.filter(poke => poke !== pokemonEl);
            pokemonEl.classList.remove("selected");
        } else if (selectedPokemons.length < 2) {
            selectedPokemons.push(pokemonEl);
            pokemonEl.classList.add("selected");
        } else {
            alert("You can only select 2 Pokémon!");
        }
    });

    pokeContainer.appendChild(pokemonEl);

};

function filterPokemon() { // filter Pokémon based on search input and selected type
    const search = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value.toLowerCase();
    const pokeBoxes = document.querySelectorAll(".poke-box");

    pokeBoxes.forEach((pokeBox) => {
        const name = pokeBox.querySelector(".poke-name").innerText.toLowerCase();
        const id = pokeBox.querySelector(".poke-id").innerText.replace("#", "");
        const type = pokeBox.querySelector(".poke-type").innerText.replace("Type: ", "").toLowerCase();

        const nameMatch = name.includes(search);
        const idMatch = id.includes(search);
        const typeMatch = selectedType === "all" || type.includes(selectedType);

        if ((nameMatch || idMatch) && typeMatch) {
            pokeBox.style.display = "block";
        } else {
            pokeBox.style.display = "none";
        }
    });
}

searchInput.addEventListener("input", filterPokemon);
typeFilter.addEventListener("change", filterPokemon);

function startBattle() { // Function to start the Pokémon battle between two selected Pokémon
    if (selectedPokemons.length !== 2) {
        alert("Please select *2* Pokémons!");
        return;
    }

    const poke1 = selectedPokemons[0];
    const poke2 = selectedPokemons[1];

    const name1 = poke1.querySelector(".poke-name").innerText;
    const name2 = poke2.querySelector(".poke-name").innerText;
    const attack1 = parseInt(poke1.querySelector(".poke-attack").innerText.replace("Attack Rate: ", ""));
    const attack2 = parseInt(poke2.querySelector(".poke-attack").innerText.replace("Attack Rate: ", ""));
    const hp1 = parseInt(poke1.querySelector(".poke-hp").innerText.replace("HP: ", ""));
    const hp2 = parseInt(poke2.querySelector(".poke-hp").innerText.replace("HP: ", ""));
    const type1 = poke1.querySelector(".poke-type").innerText.replace("Type: ", "").toLowerCase();
    const type2 = poke2.querySelector(".poke-type").innerText.replace("Type: ", "").toLowerCase();

    let attackPower1 = attack1;
    let attackPower2 = attack2;

    if (typeAdvantages[type1]?.strongAgainst.includes(type2)) {
        attackPower1 *= 1.5;
    } else if (typeAdvantages[type1]?.weakAgainst.includes(type2)) {
        attackPower1 *= 0.75;
    } else if (typeAdvantages[type1]?.immuneTo.includes(type2)) {
        attackPower1 = 0;
    }

    if (typeAdvantages[type2]?.strongAgainst.includes(type1)) {
        attackPower2 *= 1.5;
    } else if (typeAdvantages[type2]?.weakAgainst.includes(type1)) {
        attackPower2 *= 0.75;
    } else if (typeAdvantages[type2]?.immuneTo.includes(type1)) {
        attackPower2 = 0;
    }
    // Calculate remaining HP after attack
    let hpRemaining1 = hp1 - attackPower2;
    let hpRemaining2 = hp2 - attackPower1;

    let resultMessage = "";
    // Determine battle result
    if (hpRemaining1 > hpRemaining2) {
        resultMessage = `${name1} Wins!`;
    } else if (hpRemaining2 > hpRemaining1) {
        resultMessage = `${name2} Wins!`;
    } else if (hpRemaining1 === hpRemaining2) {
        resultMessage = "It's a Draw!";
    }
    
    document.querySelector(".battle-result").innerText = resultMessage; // Display battle result

    selectedPokemons.forEach(p => p.classList.remove("selected")); // Reset selected Pokémon
    selectedPokemons = [];
}


initPokemon(); // Initialize Pokémon data from API

