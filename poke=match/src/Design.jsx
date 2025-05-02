import './Design.css'
import { useState } from 'react';
let temp = [];

function Design({name, image, index}){
    const [pokemonA, setPokemonA] = useState(Array(8).fill(null));
    
    function doThis(name){
        temp.push(name);
        setPokemonA(temp);
        console.log(pokemonA);
    }
    return(
        <div className="Pokemons" onClick={() => doThis(name)}>
            <p key={index}>{name}</p>
            <img src={image} />
        </div>
    )
}

export default Design