const http = require('http');
const path = require('path');

const { connectToMongoose } = require('./util/database')
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
    User.findById("6320570c365690d10f9ccff3")
        .then(user => {
            req.user = user;
        })
        .catch(err => console.log(err))
        .finally(() => { next() });
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404)



connectToMongoose()
    .then(res => {
        User.findOne().then(u=>{
            if(!u){
                const user = new User({
                    name: "Tarik",
                    email: "tarik@gmail.com",
                    cart: {
                        items: [],
                    }
        
                })
                user.save();
            }
        })
      
        app.listen(3000)

    })
    .catch(err => {
        console.log(err)

    })
//create server

// const server = http.createServer(app)
// server.listen(3000)

//or directly with express
//app.listen(3000)