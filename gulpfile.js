var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function() {
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', {
			verbose: true
		}))
		.pipe(jscs())
		.pipe(jscs.reporter());
});

gulp.task('serve', ['style'], function() {
	var options = {
		script: 'app.js',
		delayTime: 1,
		env: {
			'PORT': 5000
		},
		watch: jsFiles
	};
	return nodemon(options)
		.on('restart', function(ev) {
			console.log('\n++++++++++Restarting++++++++++\n');
			gulp.src(jsFiles)
				.pipe(jshint())
				.pipe(jshint.reporter('jshint-stylish', {
					verbose: true
				}))
				.pipe(jscs())
				.pipe(jscs.reporter());
		});
});
