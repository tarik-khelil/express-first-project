const http = require('http');
const path = require('path');


const { connectToMongoose } = require('./util/database')
const mongodb = require("mongodb");

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); //pour sauvgarder la session dans db 
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const User = require('./models/user');



//create express app
const app = express();

//store the session in DB 
const store = new MongoDBStore({
    uri: 'mongodb+srv://tarik:chelsea95@cluster0.ghdxnkk.mongodb.net/shop',
    collection: 'session'
});


app.set('view engine', 'ejs');//permet a express de savoir quand utilise templte engine de type pug
app.set('views', 'views');//permet a node de savoir le chemin de nos views
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store:store
}))//init session (voir d'autre options)
app.use((req, res, next) => {
    User.findById("6320570c365690d10f9ccff3")
        .then(user => {
            req.user = user;
        })
        .catch(err => console.log(err))
        .finally(() => { next() });
})
app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404)



connectToMongoose()
    .then(res => { 
        User.findOne().then(u => {
            if (!u) {
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