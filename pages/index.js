import Layout from '../components/Layout'
import Pokemon from '../components/Pokemon'
import {useState, useEffect} from 'react'

export default function Home({pokemonData}) {

  const [pokemons, setPokemons]= useState(pokemonData);


  const fetchPokemon = async (URL) => {
    
  } 


  return (
        <Layout title= "PokéNext">
          <div className= "grid xs:grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-10" >
            {pokemons.map((pokemon, index)=> (
              <Pokemon key= {index} index= {index+1} pokemon= {pokemon}/>
            ))}
          </div>
          <div>
              <button>prev</button>
              <button>next</button>
          </div>
        </Layout>
  ) 
}

export async function getStaticProps(context){

  let pokemonData=[];

  //bulb starts at 1, 897 w/o other forms
  for (let i= 1; i< 50; i++){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data= await res.json();
    pokemonData.push(data);
  }

  return{
    props: {pokemonData}
  }
}
