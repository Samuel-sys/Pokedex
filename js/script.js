const PokeName = document.querySelector('.pokemon_name');
const PokeNumber = document.querySelector('.pokemon_number');
const PokeImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const PokeSearch = document.querySelector('.input_search');
const ButtonNext = document.querySelector('.btn-next');
const ButtonPrev = document.querySelector('.btn-prev');

let idPokemon = 1;

//Butão de ativação para que o usuario possa ver o pokemon no modo shiny
const btnShiny = document.querySelector('.shiny');
let shiny = false;
btnShiny.addEventListener('click',() => shiny = activatedButton(shiny,btnShiny));

const btnPosicion = document.querySelector('.posicion');
let posicion = false;
btnPosicion.addEventListener('click',() => posicion = activatedButton(posicion,btnPosicion));

const btnFull = document.querySelector('.full');
let full = false;
btnFull.addEventListener('click',() => full = activatedButton(full,btnFull));

//Essa função irá adicionar ou remover a classe "activated" do elemento que foi informado. 
//para definir isso sempre entre com o valor bool que terá a inversão de seu valor
const activatedButton = (status,elemnt)=>{
    status = !status;

    if(status){
        elemnt.classList.add('activated');
    }else{
        elemnt.classList.remove('activated');
    }

    renderPokemon(idPokemon);

    return status;
};


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

    /*Estamos definindo qual a forma da apresentação do pokemon na pokedex */
    pkm = posicion ? 'back_' : 'front_'
    pkm += shiny ? 'shiny': 'default';

    //Estamos pegando o arquivo JSON e extraindo os dados
    PokeName.innerHTML = data.name;
    PokeNumber.innerHTML = data.id;
    idPokemon = data.id;
    //Caminho até o gif do pokemon para aparecer no site
    PokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated'][pkm];

}

//Estamos vinculando o evento "submit" a função de renderPokemon para estarmos buscando o pokemon no banco e apresentando os dados
form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(PokeSearch.value);
    PokeSearch.value = '';

});

//butões de navegação da pokedex (realizamos a consulta do pokemon anterio ou seguinte da lista)
ButtonNext.addEventListener('click', () => {
    renderPokemon(idPokemon +1);
});
ButtonPrev.addEventListener('click', () => {
    renderPokemon(idPokemon > 1 ? idPokemon - 1: idPokemon);
});

window.onload = () => {
    renderPokemon();
}