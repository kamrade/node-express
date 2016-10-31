var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

// var url = 'mongodb://localhost:27017/libraryApp';
var url = 'mongodb://kamrade:213111@ds139567.mlab.com:39567/kamrade';

var books = [
	{
		'title': 'War and Peace',
		'genre': 'Historical Fiction',
		'author': 'Lev Nikolaevich Tolstoy',
		'read': 'false'
	},
	{
		'title': 'The Time Machine',
		'genre': 'Science Fiction',
		'author': 'H. G. Wells',
		'read': 'false'
	},
	{
		'title': 'Les Miserables',
		'genre': 'Historical Fiction',
		'author': 'Victor Hugo',
		'read': 'true'
	}
];

var router = function(nav) {

	adminRouter.route('/addBooks')
		.get(function(req, res) {
			mongodb.connect(url, function(err, db) {
				if (err) {
					console.log('error = ' + err);
				} else {
					console.log('connected');
				}
				var collection = db.collection('books');
				collection.insertMany(books, function(err, results) {
					res.send(results);
				});
				db.close();
			});

			// res.send('inserting books');
		});
	return adminRouter;

};

module.exports = router;
