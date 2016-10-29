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
		title: 'The Time Machine',
		genre: 'Science Fiction',
		author: 'H. G. Wells',
		read: false
	},
	{
		title: 'Les Miserables',
		genre: 'Historical Fiction',
		author: 'Victor Hugo',
		read: true
	}
];

var router = function(nav) {

	bookRouter.route('/')
		.get(function(req, res) {
			res.render('bookListView', {
				title: 'Bookz',
				nav: nav,
				books: books
			});
		});

	bookRouter.route('/:id')
		.all(function(req, res, next) {
			var id = req.params.id;
			if ((books.length - 1) < id) {
				res.status(404).send('Not Found');
				return;
			} else {
				next();
			}
		})
		.get(function(req, res) {
			var id = req.params.id;
			res.render('bookView', {
				title: 'Books',
				nav: nav,
				book: books[id]
			});
		});

		// .get(function(req, res) {
		// 	var id = req.params.id;
		// 	var sqlQuery = 'select * from books where id = ' + connection.escape(id);
		// 	connection.query(sqlQuery, function(err, recordset) {
		// 		res.render('bookView', {
		// 			title: 'Bookz',
		// 			nav: nav,
		// 			book: recordset[0]
		// 		});
		// 	});
		// });

	return bookRouter;

};

module.exports = router;
