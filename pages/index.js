import Layout from '../components/Layout'
import {useState} from 'react'

export default function Home({pokemonData}) {

  const [pokemon, setPokemon]= useState(pokemonData);

  return (
        <Layout title= "PokéNext">
          <div>
            {pokemon.results.map((pokemon, index)=> (
              <div key= {index}>
                 {pokemon.name} 
              </div>
            ))}
          </div>
        </Layout>
  ) 
}

export async function getStaticProps(context){

  const res = await fetch("https://pokeapi.co/api/v2/pokemon")
  const pokemonData= await res.json()

  return{
    props: {pokemonData}
  }
}
