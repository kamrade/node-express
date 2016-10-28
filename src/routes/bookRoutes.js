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
		.get(function(req, res) {
			var id = req.params.id;
			var sqlQuery = 'select * from books where id = ' + connection.escape(id);
			connection.query(sqlQuery, function(err, results) {
				res.render('bookView', {
					title: 'Bookz',
					nav: nav,
					book: results[0]
				});
			});
		});

	return bookRouter;

};

module.exports = router;
