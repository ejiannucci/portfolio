var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');

var htmlSources = ['app/dev/**/*.html'];
var sassSources = ['app/dev/sass/**/*.scss'];
var jsSources = ['app/dev/js/**/*.js'];

gulp.task('compileSASS', function(){
	gulp.src(sassSources)
	.pipe(sass({
		outputStyle: 'expanded'
	}))
	.pipe(rename('master.css'))
	.pipe(gulp.dest('app/dev/compiled/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('compileJS', function() {
	gulp.src(jsSources)
	.pipe(concat('main.js'))
	.pipe(gulp.dest('app/dev/compiled/js'))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app/dev'
    },
  })
});

gulp.task('buildCSS', function() {
  return gulp.src(sassSources)
    .pipe(concat('compiled.css'))
    .pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/dist/css'));
});

gulp.task('buildJS', function() {
	gulp.src(jsSources)
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/dist/js'))
});

gulp.task('watch', ['browserSync', 'compileSASS', 'compileJS'], function() {
  gulp.watch(sassSources, ['compileSASS']);
  gulp.watch(jsSources, ['compileJS']);
  gulp.watch(htmlSources, browserSync.reload); 
});

gulp.task('build', ['buildCSS', 'buildJS']);
gulp.task('default', ['compileSASS', 'compileJS', 'watch']);