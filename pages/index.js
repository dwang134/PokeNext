import Layout from '../components/Layout'
import Pokemon from '../components/Pokemon'
import {useState} from 'react'

export default function Home({pokemonArray}) {

  const [pokemons, setPokemons]= useState(pokemonArray);
  const [loading, setLoading]= useState(true);

  console.log(pokemonArray[1].sprites.other["official-artwork"].front_default);

  return (
        <Layout title= "PokéNext">
          <div>
            {pokemons.map((pokemon, index)=> (
              <Pokemon key= {index} index= {index} pokemon= {pokemon}/>
            ))}
          </div>
        </Layout>
  ) 
}

export async function getServerSideProps(context){

  let pokemonArray=[];

  //bulb starts at 1, 897 w/o other forms
  for (let i= 1; i< 898; i++){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data= await res.json();
    pokemonArray.push(data);
  }

  return{
    props: {pokemonArray}
  }
}
