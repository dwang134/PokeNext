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
    // console.log(pokemonArray);
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
    // console.log(nextURL);
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
        <Layout title= "pokéNext">
          <div className= "grid xs:grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-10" >
            {pokemon.map((pokemon, index)=> (
              <Pokemon key= {index} pokemon= {pokemon}/>
            ))}
          </div>
          <div className= "flex justify-center mt-10 gap-4">
                <button disabled= {!prevURL} className= "disabled:bg-gray-500 px-3 py-1 bg-slate-900" onClick = {()=> prevPage()}>prev</button>
                <button disabled= {!nextURL} className= "disabled:bg-gray-500 px-3 py-1 bg-slate-900" onClick = {()=> nextPage()}>next</button>
          </div>
        </Layout>
  ) 
}

export async function getStaticProps(context){

  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0');
  const pokemonData = await res.json();

  return{
    props: {pokemonData}
  }
}
