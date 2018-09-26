const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();
const config = {
  user: 'soulibrary',
  password: 'soullibrary1!',
  server: 'soulpslibrary.database.windows.net',
  database: 'PSLibrary',

  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};

sql.connect(config).catch(err => debug(err));

const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fictions',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  },
  {
    title: 'Les Miserables',
    genre: 'Historical Fictions',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fictions',
    author: 'H. G. Wells',
    read: false
  },
  {
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fictions',
    author: 'Jules Vener',
    read: false
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false
  }
];
function router(nav) {
  // Authorizing user access
  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const books = await col.find().toArray();

          res.render(
            'bookListView',
            {
              nav,
              title: 'Library',
              books
            }
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const book = await col.findOne({ _id: new ObjectId(id) });
          debug(book);

          res.render(
            'bookView',
            {
              nav,
              title: 'Library',
              book
            }
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });
  return bookRouter;
}

module.exports = router;
