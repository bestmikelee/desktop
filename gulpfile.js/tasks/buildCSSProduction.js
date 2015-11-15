var gulp = require('gulp'),
    globbing = require('gulp-css-globbing'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css');

gulp.task('buildCSSProduction', () => {
  return gulp.src('./browser/universal.scss')
      .pipe(globbing({
          // Configure it to use SCSS files
          extensions: ['.scss']
      }))
      .pipe(sass({
          errLogToConsole: true
      }))
      .pipe(rename('style.css'))
      .pipe(minifyCSS())
      .pipe(gulp.dest('./public'));
});
