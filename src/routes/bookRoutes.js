var express = require('express');
var bookRouter = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'db4free.net',
	// port: 3304,
	user: 'kamrade',
	password: 'kamrade',
	database: 'kamrade'
});

connection.connect(function(err) {
	if (err) {
		console.error('connection error: ' + err.stack);
		return;
	} else {
		console.log('connected as ' + connection.threadId);
	}
});

var router = function(nav) {

	var books = [];
	bookRouter.route('/')
		.get(function(req, res) {
			connection.query('select * from books', function(err, rows) {
				if (err) {
					console.log(err);
					return;
				}
				books = rows;
				res.render('bookListView', {
					title: 'Bookz',
					nav: nav,
					books: books
				});
			});
		});

	bookRouter.route('/:id')
		.all(function(req, res, next) {
			var id = req.params.id;
			var sqlQuery = 'select * from books where id = ' + connection.escape(id);
			connection.query(sqlQuery, function(err, recordset) {
				if (recordset.length === 0) {
					res.status(404).send('Not Found');
					return;
				} else {
					req.book = recordset[0];
					next();
				}
			});
		})
		.get(function(req, res) {
			res.render('bookView', {
				title: 'Books',
				nav: nav,
				book: req.book
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
