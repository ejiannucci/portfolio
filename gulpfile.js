var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var sassSources = ['app/dev/sass/**/*.scss']

gulp.task('sass', function(){
	gulp.src(sassSources)
	.pipe(sass({
		outputStyle: 'expanded'
	}))
	.pipe(gulp.dest('app/dev/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app/dev'
    },
  })
})

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch(sassSources, ['sass']);
  gulp.watch('app/dev/*.html', browserSync.reload); 
});

gulp.task('default', ['sass']);