import { useEffect, useState } from 'react';
import Design from './Design.jsx'
import './Pokemon.css'

function Pokemon(){
    const [array, setArray] = useState(Array(8).fill(null));
    const [pokemonList, setpokemonList] = useState([]);

    useEffect(() => {
        const generateNumbers = () => {
            const uniqueNumbers = [];
            const maxNum = 100;
            
            while (uniqueNumbers.length < 8) {
                const randomNum = Math.floor(Math.random() * maxNum);
                if (!uniqueNumbers.includes(randomNum)) {
                    uniqueNumbers.push(randomNum);
                }
            }
            
            setArray(uniqueNumbers);

        };
        
        generateNumbers();
        
        
    }, []);


    useEffect(() =>{
        if(array[0] !== null){
            const fetchPokemon = async () => {
                const pokeList = [];
                for(let i = 0; i < array.length; i++){
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${array[i]}`);
                    const data = await response.json();
                    
                    pokeList.push({
                        id: array[i],
                        name: data.name,
                        weight: data.weight,
                        image: data?data.sprites.other.dream_world.front_default:"<p>Loading</p>"
                    })
                }

                setpokemonList(pokeList);
            };
            fetchPokemon();
        }
    }, [array]);
    return(
        <div className='pokemon'>
            <div className='pokemon-name'>
                {pokemonList.map((pokemon, index) =>(              
                    <Design image={pokemon.image} name={pokemon.name} index={index}/>
                ))}
                
            </div>
        </div>
    )
}

export default Pokemon