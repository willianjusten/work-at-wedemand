// For development => gulp
// For production  => gulp -p

// Call Plugins
var env        = require('minimist')(process.argv.slice(2)),
	gulp       = require('gulp'),
	htmlmin    = require('gulp-htmlmin'),
	uglify     = require('gulp-uglify'),
	compass    = require('gulp-compass'),
	concat     = require('gulp-concat'),
	cssmin     = require('gulp-cssmin'),
	gulpif     = require('gulp-if'),
	connect    = require('gulp-connect'),
	modRewrite = require('connect-modrewrite'),
	imagemin   = require('gulp-imagemin');

// Call Htmlmin
gulp.task('html', function(){
	return gulp.src('src/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest('build/'))
		.pipe(connect.reload());
});

// Call Uglify and Concat JS
gulp.task('js', function(){
	return gulp.src('src/js/*.js')
		.pipe(concat('main.js'))
		.pipe(gulpif(env.p, uglify()))
		.pipe(gulp.dest('build/js/'))
		.pipe(connect.reload());
});

// Call Sass
gulp.task('compass', function(){
	return gulp.src('src/sass/main.scss')
		.pipe(compass({
			css: 'src/css',
			sass: 'src/sass',
			image: 'src/images'

		}))
		.pipe(gulpif(env.p, cssmin()))
		.pipe(gulp.dest('build/css/'))
		.pipe(connect.reload());
});

// Call Imagemin
gulp.task('imagemin', function() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
    .pipe(gulp.dest('build/images'));
});

// Call Watch
gulp.task('watch', function(){
	gulp.watch('src/*.html', ['html']);
	gulp.watch('src/sass/**/*.scss', ['compass']);
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('src/images/**/*.{jpg,png,gif}', ['imagemin']);
});

// Connect (Livereload)
gulp.task('connect', function() {
	connect.server({
		root: ['build/'],
		livereload: true,
		middleware: function(){
			return [
				modRewrite([
					'^/$ /index.html',
					'^([^\\.]+)$ $1.html'
				])
			];
		}
	});
});

// Default task
gulp.task('default', ['html', 'js', 'compass', 'imagemin', 'watch', 'connect']);
