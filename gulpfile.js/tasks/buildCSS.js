var gulp = require('gulp'),
    globbing = require('gulp-css-globbing'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

gulp.task('buildCSS', function() {
    return gulp.src('./browser/universal.scss')
        .pipe(globbing({
            // Configure it to use SCSS files
            extensions: ['.scss']
        }))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./public'));
});
