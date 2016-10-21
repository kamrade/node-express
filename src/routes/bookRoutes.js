var express = require('express');
var bookRouter = express.Router();

var router = function(nav) {

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
			res.render('bookListView', {
				title: 'Bookz',
				nav: nav,
				books: books
			});
		});

	bookRouter.route('/:id')
		.get(function(req, res) {
			var id = req.params.id;
			res.render('bookView', {
				title: 'Bookz',
				nav: nav,
				book: books[id]
			});
		});

	return bookRouter;

};

module.exports = router;
