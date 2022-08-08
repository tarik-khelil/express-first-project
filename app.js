const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars')

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop')


//create express app
const app = express();

app.engine(
    'hbs',
    expressHbs.engine({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
  );
app.set('view engine', 'hbs');//permet a express de savoir quand utilise templage engine de type pug
app.set('views', 'views');//permet a angulare de savoir le chemin de nos views
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.router);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})



//create server

// const server = http.createServer(app)
// server.listen(3000)

//or directly with express
app.listen(3000)