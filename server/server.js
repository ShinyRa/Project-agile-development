const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');

//Import express routes
const buttonRoutes = require('./routes/buttonRoute');

//Server port
const port = process.env.PORT || 1337
const app = express();

//Enable Cross-Origin Requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Body parser
app.use(bodyParser.json());

//Express routes
app.use('/', buttonRoutes);

//Start server
const server = app.listen(port, function(){
    console.log("Listening to port " + port);
});

module.exports = app;
