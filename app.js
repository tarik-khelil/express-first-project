const http = require('http');
const path = require('path');

const { mongoConnect } = require('./util/database')
const mongodb = require("mongodb");

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user');



//create express app
const app = express();


app.set('view engine', 'ejs');//permet a express de savoir quand utilise templte engine de type pug
app.set('views', 'views');//permet a node de savoir le chemin de nos views
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById("6319b3389e21dc9ab2502106")
        .then(user => {
            req.user = new User(user.name,user.email,user.cart,user._id);
        })
        .catch(err => console.log(err))
        .finally(() => {next()});
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404)



mongoConnect(client => {

    app.listen(3000)
})
//create server

// const server = http.createServer(app)
// server.listen(3000)

//or directly with express
//app.listen(3000)