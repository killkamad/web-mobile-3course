const path = require('path');
const express = require('express');
const hbs = require('hbs');
const giveAnime = require('../utils/requests');

const app = express();

const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);


app.use(express.static(publicDir));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'I am alive f&ckers',
        content: "OLOLO"
    })

});

app.get('/get_anime', (req, res) => {
    giveAnime((error, data) => {
        res.json({data});
    });
})

app.get('/about', (req, res) => {
    res.json({name: "Obama", title: "ex president", age: 56})
});

app.get('/help', (req, res) => {
    res.send("<h1>Page with title</h1>");
});

app.listen(3000, () => console.log("Server started"));
