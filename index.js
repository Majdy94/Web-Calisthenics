require('dotenv').config();
const express = require('express');
const fp = require('path');

const app = express();
const port = process.env.PORT || 3000;

function relative(path) {
    return fp.join(__dirname, path);
}

//Loads the handlebars module
const handlebars = require('express-handlebars');

//Sets our app to use the handlebars engine
app.set('view engine', 'handlebars');

//Sets handlebars configurations (we will go through them later on)
app.engine('handlebars', handlebars.engine({
    partialsDir: [relative('views/partials'), relative('views/partials-other')],
    layoutsDir: relative('views/layouts'),
    defaultLayout: relative('views/layouts/main.handlebars')
}));

app.use(express.static('assets'))
app.get('/', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('home', { title: 'home page', layout: 'main' });
});


app.get('/about', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('about',{ title: 'about', layout: 'main' });
});

app.listen(port, () => console.log(`App listening to port ${port}`));