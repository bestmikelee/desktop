var gulp = require('gulp'),
    livereload = require('gulp-livereload');

// Live reload business.
gulp.task('reload', () => {
    livereload.reload();
});
