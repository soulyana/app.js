const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

function router(nav) {
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
  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();

        const { recordset } = await request.query('select * from books');
        // debug(result);
        res.render(
          'bookListView',
          {
            nav,
            title: 'Library',
            books: recordset
          }
        );
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request.input('id', sql.Int, id)
          .query('select * from books where id = @id');
        res.render(
          'bookView',
          {
            nav,
            title: 'Library',
            book: recordset[id]
          }
        );
      }());
    });
  return bookRouter;
}

module.exports = router;
