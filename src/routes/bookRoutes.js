var express = require('express');
var bookRouter = express.Router();

var books = [
	{
		title: 'War and Peace',
		genre: 'Historical Fiction',
		author: 'Lev Nikolaevich Tolstoy',
		read: false
	},
	{
		title: 'Les Miserables',
		genre: 'Historical Fiction',
		author: 'Victor Hugo',
		read: true
	},
	{
		title: 'The time machine',
		genre: 'Science fiction',
		author: 'H.G.Wells',
		read: false
	}
];

bookRouter.route('/')
	.get(function(req, res) {
		res.render('books', {
			title: 'Bookz',
			nav: [{
				Link: '/Books',
				Text: 'Books'
			},{
				Link: '/Authors',
				Text: 'Authors'
			}],
			books: books
		});
	});

bookRouter.route('/single')
	.get(function(req, res) {
		res.send('Hello Single Book');
	});

module.exports = bookRouter;
