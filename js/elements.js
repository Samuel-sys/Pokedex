import { fetchPokemon, fetchPokemonType } from "./API_Pokemon.js";
import { posicion, FrontAndBack, shiny } from "./script.js";

const PokeType = document.querySelector('.pokemon_type');

const PokeNumber = document.querySelector('.pokemon_number');

const GridPoke = document.querySelector('.gridpokemon');
const PokeImage2 = createElement('img', '.pokemon_image2');
const PokeImage = document.querySelector('.pokemon_image');
const PokeName = document.querySelector('.pokemon_name');
const PokeDescription = document.querySelector('.description');

export var idPokemon = 1;
export var data = '';

function createElement(tag, ID) {
    let e = document.createElement(tag);

    e.classList.add(ID);
    return e;
}

//Função responsavel por carregar as informações do tipo do pokemon na pokedex
function renderTypePokemon(type) {

    let imgType = document.querySelectorAll('.pokemon_type_img');

    //Loop para excluir todos os elementos HTML com as informações do tipo do pokemon anterior
    for (var i = 0; i < imgType.length; i++) PokeType.removeChild(imgType[i]);

    if (!type) return;

    //Loop para criar o elementos HTML que informa a tipagem do pokemon
    for (var i = 0; i < type.length; i++) {

        let img = document.createElement('img');

        img.className = 'pokemon_type_img';

        img.src = `./images/type/${type[i].type.name}.png`;

        PokeType.appendChild(img);
    }
    document.querySelector('.type').src = `./images/type_description/${type[0].type.name}.png`;

}

export async function renderPokemon(pokemon) {

    //Caso o colaborador não escreva nada ele consulta o pokemon de ID 1
    pokemon = pokemon == '' || pokemon == null ? '1' : pokemon;
    //Permite o usuário a fazer consultas pelo nome do pokemon independente se ele escrever com tudo em maiúsculo ou minusculo
    pokemon = pokemon.toString().toLowerCase();

    //consulta na API o pokemon informado e retorna o JSON com todas as informações do pokemon
    data = await fetchPokemon(pokemon).then((data) => {

        //Esse bloco só irá ser executado se a consulta na API não retornar nenhuma informação
        if (!data) {
            PokeNumber.innerHTML = "";
            PokeName.innerHTML = "Not Found :(";
            PokeImage.src = "./images/img_default.png";
            renderTypePokemon();
            return;
        }
        PokeName.innerHTML = data.name;
        PokeNumber.innerHTML = data.id;
        idPokemon = data.id;
        //Função reponsavel por carregar os icons informando a tipagem do pokemon na pokedex
        renderTypePokemon(data.types);
        descriptionPokemon(data);

        //Estamos pegando o arquivo JSON e extraindo os dados
        rederImagePokemon(data);

        return data;
    })


}

//Função responsavel por carregar o gif do pokemon
export function rederImagePokemon(x) {
    //o JSON com os dados do pokemon tem que ser passado como parametro no metodo.
    var img = x;
    console.log('img ', img)
    img = img['sprites']['versions']['generation-v']['black-white']['animated'];

    /*Estamos definindo qual a forma da apresentação do pokemon na pokedex */
    var posicionJSON = posicion ? 'back_' : 'front_';
    var shinyJSON = shiny ? 'shiny' : 'default';

    //Bloco de condição caso o usuario queira ou não ver o pokemon nas 2 posições (frente e costas)
    if (FrontAndBack) {
        var img1 = img['back_' + shinyJSON];
        var img2 = img['front_' + shinyJSON];

        //Para evitar bugs futuros habilitamos a opção de ver ele somente em duas possições
        PokeImage2.src = img1 ? img1 : "./images/img_default.png";
        PokeImage.src = img2 ? img2 : "./images/img_default.png";

        if (!document.querySelector('.pokemon_image2')) GridPoke.appendChild(PokeImage2); //* AQUI */
    }
    else {
        var img = img[posicionJSON + shinyJSON];
        //Caminho até o gif do pokemon para aparecer no site
        PokeImage.src = img ? img : "./images/img_default.png";

        try { GridPoke.removeChild(PokeImage2); } catch { }
    }
}

//Função responsavel por carregar a lista de ataques do pokemon
async function descriptionPokemon(data) {

    //Limpando a lista antes de adicionar a nova lista de ataques
    PokeDescription.innerHTML = '';

    //Realizamos um loop que vai imprimir todos os ataques na area de descrição
    data['moves'].forEach(async item => {
        await fetchPokemonType(item.move.url).then(
            (type) => {
                //Foi feito um metodo para que assim não de leg (adicionando conforme os dados são retornasdos da API)
                //E evitar bugs
                createItemDescription(item.move.name, type.name);
            }
        )
    });

}

//Função que cria o item HTML que e adicionado na lista de descrição de ataques do pokemon
function createItemDescription(name, type) {
    let item = createElement('div', 'itemDescription');
    item.innerHTML = ` <p> ${name} </p> <img src="./images//type/${type}.png"> `
    PokeDescription.appendChild(item);
}