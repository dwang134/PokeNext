import React from 'react'
import Image from 'next/image'

const Pokemon = ({index, pokemon}) => {
  return (
    <div key= {index}>
        <Image src= {`${pokemon.sprites.other["official-artwork"].front_default}`} width= {40} height= {40}/>
        {pokemon.name}
    </div>
  )
}

export default Pokemon