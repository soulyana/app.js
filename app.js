// Pacakges in use 
var express = require('express');
var chalk = require('chalk');
var debug = require('debug');
var morgan = require('morgan');
var path = require('path');

var app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/'))) //setting up static directory & locatin
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper/dist')))

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '/views/', '/index.html')); //location of current exutable
});

app.listen(3000, function() {
    debug(`listening on port ${chalk.green('3000')}`); //string templates
}); 