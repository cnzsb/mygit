var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    // minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    // uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    // rename = require('gulp-rename'),
    // concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    // livereload = require('gulp-livereload'),
    // del = require('del'),
    browserSync = require('browser-sync');

gulp.task('html', function () {
	return gulp.src('src/*.html')
		.pipe(gulp.dest('dist/'))
		.pipe(notify({message: 'HTML done!'}));
});

gulp.task('sass', function () {
	return sass('src/sass/*.scss', {style: 'expanded'})
		.pipe(autoprefixer('last 2 version', 'ie >= 7'))
		.pipe(gulp.dest('dist/css/'))
		.pipe(notify({message: 'Sass done!'}));
});

gulp.task('js', function () {
	return gulp.src('src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(gulp.dest('dist/js/'))
		.pipe(notify({message: 'JS done!'}));
});

gulp.task('img', function () {
	return gulp.src('src/images/*')
		.pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
		.pipe(gulp.dest('dist/images/'))
		.pipe(notify({message: 'Images done!'}))
});

gulp.task('default', ['html', 'sass', 'js', 'img']);

gulp.task('refresh', ['html', 'sass', 'js', 'img'], function () {
	var files = [
		'dist/*.html',
		'dist/css/*.css',
		'dist/js/*.js',
		'dist/images/*'
	];

	browserSync.init(files, {
		server: {
			baseDir: 'dist/'
		}
	});

	gulp.watch('src/*.html', ['html']);
	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('src/js/*.js', ['js']);
	gulp.watch('src/images/*', ['img']);
});