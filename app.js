// Pacakges in use
const express = require('express');
const chalk = require('chalk');
const debug = require('debug');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/'))); // setting up static directory & locatin
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/', '/index.html')); // location of current exutable
});

app.listen(3000, () => {
  debug(`listening on port ${chalk.green('3000')}`); // string templates
});
