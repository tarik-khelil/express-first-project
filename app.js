const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop')

const sequelize = require("./util/database");
const associations = require('./util/associations');
const User = require('./models/user');



//create express app
const app = express();


app.use((req, res, next) => {
    User.findByPk(1)
        .then(resp => {
            req.user = resp;
            next();
        })
        .catch(err => console.log(err))
})
app.set('view engine', 'ejs');//permet a express de savoir quand utilise templage engine de type pug
app.set('views', 'views');//permet a angulare de savoir le chemin de nos views
app.use(bodyParser.urlencoded({
    extended: false
}));



app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404)
//create association betewwen tables 
associations();
//syncs modesl to the DB by creating the appropriate tables
sequelize.sync({ force: false }) //force=true to create new instance evry time, in production force=false
    .then(result => {
        return User.findByPk(1)
    })
    .then(user => {
        if (!user) {
            return User.create({ name: "Tarik", email: "tarik@gmail.com" })
        }
        return user
    })
    .then(user => {
        return user.createCart();
    })
    .then(res=>{
        app.listen(3000);
    })
    .catch(err => console.log(err));

//create server

// const server = http.createServer(app)
// server.listen(3000)

//or directly with express
//app.listen(3000)