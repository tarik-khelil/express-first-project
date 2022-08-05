const http = require('http')

const express = require('express')

//create express app
const app = express();
//use allow us to add a new middleware function
app.use((req, res, next) => {
    console.log('in the middleware!');
    next(); //allow the request to continue to the  middleware in line
    //if newt is not callad we should return a response 


});

app.use((req, res, next) => {
    console.log('in another middleware!');
    //send() sending a response
    res.send('<h1>Hello from Express</h1>')

});

//create server

// const server = http.createServer(app)
// server.listen(3000)

//or directly with express
 app.listen(3000)