const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop')

const db = require("./util/database");


//create express app
const app = express();

app.set('view engine', 'ejs');//permet a express de savoir quand utilise templage engine de type pug
app.set('views', 'views');//permet a angulare de savoir le chemin de nos views
app.use(bodyParser.urlencoded({
    extended: false
}));

// db.execute('SELECT * FROM products')
//     .then(res => {
//         console.log(res[0]);
//     })
//     .catch(err => {
//         console.log(err);
//     })

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404)



//create server

// const server = http.createServer(app)
// server.listen(3000)

//or directly with express
app.listen(3000)