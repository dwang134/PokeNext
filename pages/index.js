import Layout from '../components/Layout'
import Pokemon from '../components/Pokemon'
import React, {useState, useEffect} from 'react'
import {getPokemon} from '../services/pokemon'
export default function Home() {

  const [pokemons, setPokemons] = useState([]);
  const [nextURL, setNextURL] = useState('');
  const [prevURL, setPrevURL] = useState('');
  const [isLoading, setLoading] = useState(true);
  const initialURL= "https://pokeapi.co/api/v2/pokemon?offset=0&limit=50"

    useEffect(() => {
      const fetchData= async() => {
        const res = await getPokemon(initialURL);
        setNextURL(res.next);
        setPrevURL(res.prev);
        fetchPokemon(res.results);
        setLoading(false);
      }
      fetchData();
    }, []);

  // const initialURL = "https://pokeapi.co/api/v2/pokemon?offset=50&limit=50"
  const fetchPokemon = async(res)=> {
    const pokemonData= [];
    res.map(async pokemon=> {
      pokemonData.push(await getPokemon(pokemon.url));
    })
    console.log(pokemonData);
    setPokemons(pokemonData);
  }

  // export const getPokemon = async (url)=> {
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   return data;
  //   // fetchPokemon(data);
  //   // setNextURL(data.next);
  //   // setPrevURL(data.previous);
  //   // setPokemons(pokemonData);
  // }

  return (
        <Layout title= "PokéNext">
          <div className= "grid xs:grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-10" >
          {isLoading? <h1>Loading...</h1> : (
            <h1>Data is fetched</h1>
          )}
          {/* {nextURL} */}
          {pokemons.map((pokemon, index)=> <h1 key={index}>{pokemon}</h1>)}
            {pokemons.map((pokemon, index)=> (
              <Pokemon key= {index} index= {index+1} pokemon= {pokemon} />
            ))}
          </div>
        </Layout>
  ) 

}

