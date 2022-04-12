export const getPokemon= async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export const fetchPokemon = async(res)=> {
    const pokemonData= [];
    res.map(async pokemon=> {
      pokemonData.push(await getPokemon(pokemon.url));
    })
    
    return pokemonData;
  }