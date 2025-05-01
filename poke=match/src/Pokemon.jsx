import { useEffect, useState } from 'react';

function Pokemon(){
    const [data,setData] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState(1);
    const [array, setArray] = useState(Array(8).fill(null));

    const URL =`https://pokeapi.co/api/v2/pokemon/${number}`;

    useEffect(() => {
        const generateNumbers = () => {
            const uniqueNumbers = [];
            const maxNum = 1025;
            
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
        
    useEffect(() => {
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                console.log(data.name.length);
                setName(data.name);
            })
    }, [URL]);



    return(
        <div className='App'>
            <h1>Pokemon</h1>
            <h2>{name}</h2>
        </div>
    )
}

export default Pokemon