// Pacakges in use
const express = require('express');
const chalk = require('chalk');
const debug = require('debug');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

const config = {
  user: 'library',
  password: 'soullibrary1!',
  server: 'soulpslibrary.database.windows.net',
  database: 'PSLibrary',

  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};

sql.connect(config).catch(err => debug(err));

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/'))); // setting up static directory & locatin
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Book' },
  { link: '/authors', title: 'Author' }
];

const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use('/books', bookRouter);
app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [{ link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' }],
      title: 'Library'
    }
  ); // location of current exutable
});

app.listen(port, () => {
  debug(`listening at port ${chalk.green('port')}`); // string templates
});
