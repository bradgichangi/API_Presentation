let pokemon1 = 'pikachu'
const fetch = require('node-fetch');

async function callPokemons (pokemon) {

    let url = `https://pokeapi.co/api/v2/pokemon/`;
    // const res =  await fetch(url)
    // const data = await res.json()

    // console.log(data);
    // return data;

    let save;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        save = data.results
        console.log(data.results)})

    return save;
}

module.exports = { callPokemons }
