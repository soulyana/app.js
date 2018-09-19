// Pacakges in use
const express = require('express');
const chalk = require('chalk');
const debug = require('debug');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/'))); // setting up static directory & locatin
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.set('views', './src/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index'); // location of current exutable
});

app.listen(port, () => {
  debug(`listening at port ${chalk.green('port')}`); // string templates
});
