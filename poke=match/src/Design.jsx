import './Design.css'
import { useState, useEffect } from 'react';

function Design({name, image, index, onPokemonClick}){
    
    return(
        <div className="Pokemons" onClick={() => onPokemonClick(name)}>
            <p key={index}>{name}</p>
            <img src={image} />
        </div>
    )
}

export default Design