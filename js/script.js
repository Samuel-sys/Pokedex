const PokeName = document.querySelector('.pokemon_name');
const PokeNumber =document.querySelector('.pokemon_number');
const PokeImage =document.querySelector('.pokemon_image');

const form =document.querySelector('.form');
const PokeSearch =document.querySelector('.input_search');

const fetchPokemon = async (pokemon) =>{

    /*Estamos realizado o processo de consulta na PokeAPI de um pokemon e estamos aguardando
    Recebimento dos dados do pokemon */
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    const data = await APIResponse.json(); //extraimos os dados JSONG

    return data;
}

const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);

    //Estamos pegando o arquivo JSON e extraindo os dados
    PokeName.innerHTML = data.name;
    PokeNumber.innerHTML = data.id;
    PokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front-default'];

}

//Estamos vinculando o evento "submit" a função de renderPokemon para estarmos buscando o pokemon no banco e apresentando os dados
form.addEventListener('submit', (event)=>{

    event.preventDefault();

    renderPokemon(PokeSearch.value == '' || PokeSearch.value == null ? 1 : PokeSearch.value);

    PokeSearch.value = '';

});