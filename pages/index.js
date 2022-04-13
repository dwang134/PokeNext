import Layout from '../components/Layout'
import Pokemon from '../components/Pokemon'
import {useState, useEffect} from 'react'

export default function Home({pokemonData}) {

  const [pokemon, setPokemon]= useState([]);
  const [currentURL, setCurrentURL]= useState('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0');
  const [nextURL, setNextURL] = useState(pokemonData.next);
  const [prevURL, setPrevURL] = useState(pokemonData.previous);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(20);

  useEffect(()=> {
    getPokemon(pokemonData.results);
  }, [])

  const getPokemon = async(data)=> {
    const pokemonArray = await Promise.all(data.map(async pokemon=> await fetchPokemon(pokemon.url))); 
    console.log(pokemonArray);
    setPokemon(pokemonArray);
  }

  const fetchPokemon = async(url)=> {
     const res= await fetch(url);
     const data= await res.json();
     return data; 
  }

  const getData= async(url)=>{
    const res= await fetch(url);
    const data= await res.json();
    return data;
  }

  const nextPage= async()=> {
    // setCurrentURL(nextURL);
    console.log(nextURL);
    const pokemonData= await getData(nextURL);
    // console.log(pokemonData);
    // console.log(pokemonData);

    getPokemon(pokemonData.results);
    setNextURL(pokemonData.next);
    setPrevURL(pokemonData.previous)
  }

  const prevPage= async()=> {
    // setCurrentURL(nextURL);
    console.log(prevURL);
    const pokemonData= await getData(prevURL);
    getPokemon(pokemonData.results);
    setPrevURL(pokemonData.previous);
    setNextURL(pokemonData.next);
  }


  return (
        <Layout title= "PokéNext">
          <div className= "grid xs:grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-10" >
            {pokemon.map((pokemon, index)=> (
              <Pokemon key= {index} index= {index+1} pokemon= {pokemon}/>
            ))}
          </div>
          <div>
              <button onClick = {()=> prevPage()}>prev</button>
              <button onClick = {()=> nextPage()}>next</button>
          </div>
        </Layout>
  ) 
}

export async function getStaticProps(context){

  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0');
  const pokemonData = await res.json();

  return{
    props: {pokemonData}
  }
}
