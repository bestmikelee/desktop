var gulp = require('gulp'),
    eslint = require('gulp-eslint');

gulp.task('lintJS', () => {

    return gulp.src(['./browser/**/*.js', './server/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());

});
