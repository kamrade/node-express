var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

// var url = 'mongodb://localhost:27017/libraryApp';
var url = 'mongodb://kamrade:213111@ds139567.mlab.com:39567/kamrade';

var router = function(nav) {

	bookRouter.route('/')
		.get(function(req, res) {
			mongodb.connect(url, function(err, db) {
				var collection = db.collection('books');
				collection.find({}).toArray(
					function(err, results) {
						res.render('bookListView', {
							title: 'Bookz',
							nav: nav,
							books: results
						});
					}
				);
			});
		});

	bookRouter.route('/:id')
		.get(function(req, res) {
			var id = new ObjectId(req.params.id);
			mongodb.connect(url, function(err, db) {
				var collection = db.collection('books');
				collection.findOne({_id: id},
					function(err, result) {
						res.render('bookView', {
							title: 'Books',
							nav: nav,
							book: result
						});
					}
				);
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
