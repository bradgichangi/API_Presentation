const express =  require('express');
const app = express();
const methodOverride = require('method-override')
const port = process.env.PORT || 3000;
//const cors = require('cors')

const callPokemons = require('./fetchPokemons');

app.use(express.json())
app.use(express.urlencoded());
app.use(methodOverride('_method'))
//app.use(cors);

let allPokemonsGlocal;

async function allPokemonsGlocalFunc () {
    allPokemonsGlocal = await callPokemons.callPokemons();
    return allPokemonsGlocal;
}

allPokemonsGlocalFunc();

app.get('/', async (req, res)=> {

    const savedData = allPokemonsGlocal;
    const poke = await callPokemons.getInfo('ditto');
    
    res.send(savedData);
});


app.get('/pokemon/:name', async (req, res)=> {

    const allPokemons = await callPokemons.callPokemons();
    const searchedPoke = await callPokemons.getInfo(req.params.name);
    //const pokeMatch = allPokemons.find(poke=> poke.name === req.params.name)

    //console.log(searchedPoke);
    //console.log(pokeMatch);
    
    //if(pokeMatch) return res.status(404).send('game does not exist')
    res.send(searchedPoke);
});


app.post('/pokemon', (req, res)=> {

    const newPoke = {
        name: req.body.name,
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        "type": [
          "grass",
          "poison"
        ]
    }

    allPokemonsGlocal.push(newPoke);
    res.send(allPokemonsGlocal);
});

app.put('/pokemon/:name', (req, res)=> {

    console.log(req.params.name);

    const pokeToUpdate = {
        name: req.params.name,
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        "type": [
          "grass",
          "updateThis"
        ]
    }

    const pokemonToChange = allPokemonsGlocal
    .find(poke=> poke.name === req.params.name)
    if(!pokemonToChange) return res.status(404).send('this pokemon does not exist')

    const index = allPokemonsGlocal.indexOf(pokemonToChange);
    console.log(index);
    allPokemonsGlocal[index] = pokeToUpdate;

    res.send(allPokemonsGlocal);

});

app.delete('/pokemon/:name', async (req, res)=> {

    // console.log(req.params.name);
    // console.log(`&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&`);
    // console.log(allPokemonsGlocal);

    const pokemonToDelete = allPokemonsGlocal
    .find(poke=> poke.name === req.params.name)
    if(!pokemonToDelete) return res.status(404).send('this pokemon does not exist')
   
    const index = allPokemonsGlocal.indexOf(pokemonToDelete);
    allPokemonsGlocal.splice(index, 1);

    res.send(allPokemonsGlocal);

});


app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})
