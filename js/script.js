import { data, idPokemon, rederImagePokemon, renderPokemon } from "./elements.js";

const PokeImage = document.querySelector('.pokemon_image');

const PokeSearch = document.querySelector('.input_search');
const ButtonNext = document.querySelector('.btn-next');
const ButtonPrev = document.querySelector('.btn-prev');

PokeSearch.addEventListener('keyup', (x) => x.key == 'Enter' ? renderPokemon(PokeSearch.value) : '');

//Butão de ativação para que o usuario possa ver o pokemon no modo shiny
const btnShiny = document.querySelector('.shiny');
export var shiny = false;
btnShiny.addEventListener('click', () => {
    shiny = activatedButton(shiny, btnShiny);
    rederImagePokemon(data);
});

const btnPosicion = document.querySelector('.posicion');
export var posicion = false;
btnPosicion.addEventListener('click', () => {
    posicion = activatedButton(posicion, btnPosicion);
    rederImagePokemon(data);
});

const btnFrontAndBack = document.querySelector('.FrontAndBack');
export var FrontAndBack = false;
btnFrontAndBack.addEventListener('click', () => {
    FrontAndBack = activatedButton(FrontAndBack, btnFrontAndBack);
    rederImagePokemon(data);

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

    return status;
};

//Estamos vinculando o evento "submit" a função de renderPokemon para estarmos buscando o pokemon no banco e apresentando os dados
/*PokeSearch.addEventListener('keydown', (event) => {
    console.log(event.key);
    renderPokemon(PokeSearch.value);
    PokeSearch.value = '';
});*/

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