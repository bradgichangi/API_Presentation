const express =  require('express');
const app = express();
const port = process.env.PORT || 3000;
//const cors = require('cors')

const callPokemons = require('./fetchPokemons');

app.use(express.json())
app.use(express.urlencoded());
//app.use(cors);

const games = [
    callPokemons.callPokemons()
]

app.get('/', async (req, res)=> {

    const savedData = await callPokemons.callPokemons()

    console.log('saveddata = ' + savedData);
    res.send(await callPokemons.callPokemons());
});

app.get('/pokemon/:list', (req, res)=> {

});

app.get('/pokemon/:name', (req, res)=> {
    const game = games.find(g=> g.id === parseInt(req.params.id))
    if(!game) return res.status(404).send('game does not exist')
    res.send(game);
});

app.post('/pokemon', (req, res)=> {
    // const game = {
    //     id: games.length + 1,
    //     title: req.body.title
    // }

    // console.log(req.body);

    // games.push(game);
    // res.send(games);
});

app.put('/pokemon/:id', (req, res)=> {
    // const game = games.find(g=> g.id === parseInt(req.params.id))
    // if(!game) return res.status(404).send('game does not exist')
   
    // game.title = req.body.title;
    // res.send(games);

});

app.delete('/pokemon/:id', (req, res)=> {
    // const game = games.find(g=> g.id === parseInt(req.params.id))
    // if(!game) return res.status(404).send('game does not exist')
   
    // console.log(game);
    // const index = games.indexOf(game);
    // games.splice(index, 1);

    // res.send(game);

});


app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})
