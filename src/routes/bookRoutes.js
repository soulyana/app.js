const express = require('express');

const bookRouter = express.Router();

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
    res.render('books',
      {
        nav: [{ link: '/books', title: 'Books' },
          { link: '/authors', title: 'Authors' }],
        title: 'Library',
        books
      });
  });

bookRouter.route('/single')
  .get((req, res) => {
    res.send('hello single book');
  });

module.exports = bookRouter;
