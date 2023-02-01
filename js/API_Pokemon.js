export async function fetchPokemon(pokemon) {

    /*Estamos realizado o processo de consulta na PokeAPI de um pokemon e estamos aguardando
    Recebimento dos dados do pokemon */
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    //ele só irá passar o arquivo JSON para o resto do projeto se ele encontrar pokemon
    if (APIResponse.status == 200) {
        const data = await APIResponse.json(); //extraimos os dados JSONG
        return data;
    }
}

export async function fetchPokemonType(url) {
    const APIResponse = await fetch(url);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();

        return data['type']
    }
}