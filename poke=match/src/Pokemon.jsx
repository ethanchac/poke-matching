import { useEffect, useState } from 'react';
import Design from './Design.jsx'
import './Pokemon.css'

function Pokemon(){
    const [array, setArray] = useState(Array(8).fill(null));
    const [pokemonList, setpokemonList] = useState([]);
    const [pokemonA, setPokemonA] = useState([]);
    const [count, setCount] = useState(0);
    const [highScore, sethighScore] = useState(0);
    
    function addPokemon(name){
        if(pokemonA.includes(name)){
            setPokemonA([]);
            sethighScore(count, highScore);
            setCount(0);
        }else{
            const shuffleArray = () =>{
                const tempArr = [...pokemonList];
                for(let i = 0; i < tempArr.length; i++){
                    const j = Math.floor(Math.random() * (i+1));
                    [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
                }
                setpokemonList(tempArr);
            }
            shuffleArray();
            const newList = [...pokemonA, name];
            setPokemonA(newList);
            setCount(prevCount => prevCount + 1);
        }
        
    }
    useEffect(() =>{
        //console.log(pokemonA);
    }, [pokemonA]);


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
        <>
            <div className='pokemon'>
                <div className='pokemon-name'>
                    {pokemonList.map((pokemon, index) =>(              
                        <Design 
                            image={pokemon.image} 
                            name={pokemon.name} 
                            index={index}
                            onPokemonClick={addPokemon}
                            />
                    ))}

                </div>
                
            </div>
            <div className='count'>
                <h3>Score: {count}</h3>
                <h3>HighScore: {highScore}</h3>
            </div>
        </>
        
        
    )
}

export default Pokemon