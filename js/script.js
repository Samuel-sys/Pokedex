const PokeName = document.querySelector('.pokemon_name');
const PokeNumber = document.querySelector('.pokemon_number');
const PokeImage = document.querySelector('.pokemon_image');
const TwoPokeImage = document.querySelectorAll('.pokemon_image2');
const PokeType = document.querySelector('.pokemon_type');

const form = document.querySelector('.form');
const PokeSearch = document.querySelector('.input_search');
const ButtonNext = document.querySelector('.btn-next');
const ButtonPrev = document.querySelector('.btn-prev');

let idPokemon = 1;

//Butão de ativação para que o usuario possa ver o pokemon no modo shiny
const btnShiny = document.querySelector('.shiny');
let shiny = false;
btnShiny.addEventListener('click', () => shiny = activatedButton(shiny, btnShiny));

const btnPosicion = document.querySelector('.posicion');
let posicion = false;
btnPosicion.addEventListener('click', () => posicion = activatedButton(posicion, btnPosicion));

const btnFrontAndBack = document.querySelector('.FrontAndBack');
let FrontAndBack = false;

//Essa função irá ser responsavel por alternar no modo de apresentar 2 fotos ao mesmo tempo ou apresentar somente uma.
btnFrontAndBack.addEventListener('click', () => {
    FrontAndBack = activatedButton(FrontAndBack, btnFrontAndBack);
    if (FrontAndBack) {
        PokeImage.classList.add('hide');
        TwoPokeImage[0].classList.remove('hide');
        TwoPokeImage[1].classList.remove('hide');
    }
    else {
        PokeImage.classList.remove('hide');
        TwoPokeImage[0].classList.add('hide');
        TwoPokeImage[1].classList.add('hide');
    }
});

/*Essa função irá adicionar ou remover a classe "activated" do elemento que foi informado. 
para definir isso sempre entre com o valor bool que terá a inversão de seu valor e o Elemento HTML que tera
o seu estilo (CSS) alterado pela classe "activated" */
const activatedButton = (status, elemnt) => {
    status = !status;

    if (status) {
        elemnt.classList.add('activated');
    } else {
        elemnt.classList.remove('activated');
    }

    renderPokemon(idPokemon);

    return status;
};

//Função responsavel por carregar as informações do tipo do pokemon na pokedex
const renderTypePokemon = (type) => {

    let imgType = document.querySelectorAll('.pokemon_type_img');

    //Loop para excluir todos os elementos HTML com as informações do tipo do pokemon anterior
    for(var i = 0; i < imgType.length ; i++ ) PokeType.removeChild(imgType[i]);

    //Loop para criar o elementos HTML que informa a tipagem do pokemon
    for(var i = 0 ; i < type.length; i++){

        let img = document.createElement('img');
        
        img.className = 'pokemon_type_img';

        img.src = `./images/type/${type[i].type.name}.png`;
        
        PokeType.appendChild(img);
    }
}

const renderPokemon = async (pokemon) => {

    //Caso o colaborador não escreva nada ele consulta o pokemon de ID 1
    pokemon = pokemon == '' || pokemon == null ? '1' : pokemon;
    //Permite o usuário a fazer consultas pelo nome do pokemon independente se ele escrever com tudo em maiúsculo ou minusculo
    pokemon = pokemon.toString().toLowerCase();

    //consulta na API o pokemon informado e retorna o JSON com todas as informações do pokemon
    const data = await fetchPokemon(pokemon).then((data) => {

        var img = data['sprites']['versions']['generation-v']['black-white']['animated'];

        /*Estamos definindo qual a forma da apresentação do pokemon na pokedex */
        var posicionJSON = posicion ? 'back_' : 'front_';
        var shinyJSON = shiny ? 'shiny' : 'default';

        //Bloco de condição caso o usuario queira ou não ver o pokemon nas 2 posições (frente e costas)
        if (FrontAndBack) {
            var img1 = img['back_' + shinyJSON];
            var img2 = img['front_' + shinyJSON];

            //Para evitar bugs futuros habilitamos a opção de ver ele somente em duas possições
            TwoPokeImage[0].src = img1 ? img1 : "./images/img_default.png";
            TwoPokeImage[1].src = img2 ? img2 : "./images/img_default.png";
        }
        else {
            var img = img[posicionJSON + shinyJSON];
            //Caminho até o gif do pokemon para aparecer no site
            PokeImage.src = img ? img : "./images/img_default.png";
        }

        //Estamos pegando o arquivo JSON e extraindo os dados
        PokeName.innerHTML = data.name;
        PokeNumber.innerHTML = data.id;
        idPokemon = data.id;

        //Função reponsavel por carregar os icons informando a tipagem do pokemon na pokedex
        renderTypePokemon(data.types);
    })

}

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

//Estamos vinculando o evento "submit" a função de renderPokemon para estarmos buscando o pokemon no banco e apresentando os dados
form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(PokeSearch.value);
    PokeSearch.value = '';

});

//butões de navegação da pokedex (realizamos a consulta do pokemon anterio ou seguinte da lista)
ButtonNext.addEventListener('click', () => renderPokemon(idPokemon + 1));
document.addEventListener('keydown', //toma da de decisão usando condição ternaria onde que dependendo da tecla que o usuario clicar o sistema irá ou não executar o bloco
    (x) => x.key == 'ArrowRight' ?              //true
        renderPokemon(idPokemon + 1) : null);   //false

ButtonPrev.addEventListener('click', () => renderPokemon(idPokemon > 1 ? idPokemon - 1 : idPokemon));
document.addEventListener('keydown',
    (x) => x.key == 'ArrowLeft' ?
        renderPokemon(idPokemon > 1 ? idPokemon - 1 : idPokemon) : null);

window.onload = () => {
    renderPokemon();
}