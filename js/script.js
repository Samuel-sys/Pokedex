const PokeName = document.querySelector('.pokemon_name');
const PokeNumber = document.querySelector('.pokemon_number');
const PokeImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const PokeSearch = document.querySelector('.input_search');

const fetchPokemon = async (pokemon) => {

    /*Estamos realizado o processo de consulta na PokeAPI de um pokemon e estamos aguardando
    Recebimento dos dados do pokemon */
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    //ele só irá passar o arquivo JSON para o resto do projeto se ele encontrar pokemon
    if (APIResponse.status == 200) {
        const data = await APIResponse.json(); //extraimos os dados JSONG
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    //Caso o colaborador não escreva nada ele consulta o pokemon de ID 1
    pokemon = pokemon == '' || pokemon == null ? '1' : pokemon;
    //Permite o usuário a fazer consultas pelo nome do pokemon independente se ele escrever com tudo em maiúsculo ou minusculo
    pokemon = pokemon.toString().toLowerCase();

    const data = await fetchPokemon(pokemon);

    //Estamos pegando o arquivo JSON e extraindo os dados
    PokeName.innerHTML = data.name;
    PokeNumber.innerHTML = data.id;
    //Caminho até o gif do pokemon para aparecer no site
    PokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

}

//Estamos vinculando o evento "submit" a função de renderPokemon para estarmos buscando o pokemon no banco e apresentando os dados
form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(PokeSearch.value);
    PokeSearch.value = '';

});

window.onload = () => {
    renderPokemon();
}