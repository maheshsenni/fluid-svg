/*global require*/

var gulp = require('gulp'),
	browserify = require('browserify'),
	uglify = require('gulp-uglify'),
	streamify = require('gulp-streamify'),
	source = require('vinyl-source-stream'),
	del = require('del'),
	rename = require('gulp-rename'),
	sass = require('gulp-ruby-sass'),
	minifycss = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer');

var paths = {
	'build_dir': {
		'js': './app/scripts',
		'css': './app/styles'
	},
	'js_dir': './scripts/',
	'css_dir': './styles/',
	'main_script': 'main.js'
};

gulp.task('js', ['clean'], function() {
	'use strict';
  return browserify(paths.js_dir + paths.main_script)
    .bundle()
    .pipe(source('app.js'))
    // write browserify output to file
    .pipe(gulp.dest(paths.build_dir.js))
    // uglify
    .pipe(streamify(uglify()))
    .pipe(rename({ extname: '.min.js' }))
    // write minified file
    .pipe(gulp.dest(paths.build_dir.js));
});

gulp.task('sass', ['clean-css'], function() {
	'use strict';
	return gulp.src('styles/main.scss')
		.pipe(sass({ sourcemap: false, style: 'expanded'}))
		.pipe(autoprefixer())
		.pipe(minifycss())
		.pipe(rename({
			basename: 'app.min',
			extname: '.css'
		}))
		.pipe(gulp.dest(paths.build_dir.css));
});

gulp.task('clean-js', function(cb) {
    'use strict';
    del([paths.build_dir.js + '/*.js'], cb);
});

gulp.task('clean-css', function(cb) {
    'use strict';
    del([paths.build_dir.css + '/*.css'], cb);
});

gulp.task('clean', ['clean-js', 'clean-css']);
gulp.task('build', ['clean', 'sass', 'js']);