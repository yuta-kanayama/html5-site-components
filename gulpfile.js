var gulp = require('gulp'),
		shell = require('gulp-shell'),
		livereload = require('gulp-livereload');


//
gulp.task('compass_compile', shell.task([
	'compass compile'
]));


//
gulp.task('watch', function(){
	
	livereload.listen();
	
	gulp.watch('public_html/assets/_scss/**/*.scss', function(event){
		gulp.run('compass_compile');
	});
	
	gulp.watch([
		'public_html/**/*.html',
		'public_html/**/*.php',
		'public_html/**/*.css',
		'public_html/**/*.js',
	]).on('change', livereload.changed);
	
});


//
gulp.task('default', ['watch']);


//
gulp.task('styledocco', shell.task([
	'styledocco -n "StyleGuide" --preprocessor "sass --compass" -o styleguide public_html/assets/_scss'
]));

