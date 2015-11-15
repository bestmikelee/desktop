var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    runSeq = require('run-sequence');

gulp.task('default', () => {

    livereload.listen();
    gulp.start('build');

    gulp.watch(['browser/**/*.js', 'browser/**/*.html'], () => {
        runSeq('buildJS','webpack', 'reload');
    });

    gulp.watch('browser/**/*.scss', () => {
        runSeq('buildCSS', 'reloadCSS');
    });

    gulp.watch('server/**/*.js', ['lintJS']);

    // Reload when a template (.html) file changes.
    gulp.watch(['server/app/views/*.html'], ['reload']);
});
