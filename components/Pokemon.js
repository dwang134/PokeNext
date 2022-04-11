import React from 'react'
import Image from 'next/image'

const Pokemon = ({index, pokemon}) => {
  
  const pokeIndex = '#'+ ('00'+ index).slice(-3);

  return (
    <div key= {index} className= "bg-slate-900 p-5 pt-10 rounded  flex flex-col justify-center items-center relative">
        <div className= "absolute text-4xl top-1 right-3 text-gray-500 font-bold"> {pokeIndex}</div>
        <Image src= {`${pokemon.sprites.other["official-artwork"].front_default}`} width= {150} height= {150} layout= 'intrinsic' alt= 'pokemon'/>
        <div className= "capitalize text-lg tracking-wide">{pokemon.name}</div>
    </div>
  )
}

export default Pokemon