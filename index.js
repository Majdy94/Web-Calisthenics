require('dotenv').config();
const express = require('express');
const fp = require('path');
const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const app = express();
const Router = require('./routes');
const stripe = require("stripe")(process.env.SECRETKEY);

const port = process.env.PORT || 80;

// Statische Daten einbinden
const accesslist = require("./data/accesslist.json");
const config = require("./config.json");
const mimetypes = require("./data/mimetypes.json");
const users = require("./data/users.json");
const nodemailer = require("nodemailer");
const { text } = require("stream/consumers");

function relative(path) {
    return fp.join(__dirname, path);
}
fp.baseUrl = __dirname;
//Loads the handlebars module
const handlebars = require('express-handlebars');
const { router } = require('./routes');
const errorHandlerMiddleware = require('./middleware/error');
const notFound = require('./middleware/notFound');
const bodyParser = require('body-parser');

//Sets our app to use the handlebars engine
app.set('view engine', 'handlebars');

//Sets handlebars configurations (we will go through them later on)
app.engine('handlebars', handlebars.engine({
    partialsDir: [relative('views/partials'), relative('views/partials-other')],
    layoutsDir: relative('views/layouts'),
    defaultLayout: relative('views/layouts/main.handlebars')
}));

app.use(express.static(fp.join(__dirname,'assets')));
//middleware
app.use(express.json())
//parsing html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser()); TODO
//routes
app.use(Router);
//notfound middleware
app.use(notFound);

//erroe midlleware
app.use(errorHandlerMiddleware);



app.listen(port, () => console.log(`App listening to port ${port}`));




/**
 * app.get('/', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('home', { title: 'home page', layout: 'main' });
});


app.get('/about', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('about',{ title: 'about', layout: 'main' });
});

 */