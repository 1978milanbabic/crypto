var gulp = require('gulp');
var htmlbeautify = require('gulp-html-beautify');
var cssbeautify = require('gulp-cssbeautify');
var jsbeautify = require('gulp-beautify');
var replace = require('gulp-replace-path');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var prefix = require('gulp-autoprefixer');
var cssMin = require('gulp-css');

//********** DEVELOPMENT - CODE BEUATIFIERS **********

//html beautify
gulp.task('html-beautify', function () {
    var options = {
        indentSize: 2
    };
    gulp.src('./development/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./development/'));
});

//css beautify
gulp.task('beautifyCSS', function () {
    gulp.src([
        './development/css/*.css'
    ])
    .pipe(cssbeautify())
    .pipe(gulp.dest('./development/css/'));
});

//js beautify
gulp.task('beautifyJS', function () {
    gulp.src([
        './development/js/*.js'
    ])
    .pipe(jsbeautify())
    .pipe(replace('function(', 'function ('))
    .pipe(gulp.dest('./development/js/'));
});

//********** DEVELOPMENT DEFAULT - CODE BEAUTIFY **********

gulp.task('clean', ['html-beautify', 'beautifyCSS', 'beautifyJS']);

//********** PUTING TO PRODUCTION **********

//***** images *****
//minimize images and puts to production
gulp.task('images', function () {
    gulp.src([
        './development/img/**/*'
    ])
    .pipe(imagemin())
    .pipe(gulp.dest('./public_html/img/'));
});

//***** JS *****
//uglifies JS and puts to production
gulp.task('uglifyJS', function () {
    gulp.src([
        './development/js/*.js'
    ])
    .pipe(uglify())
    .pipe(gulp.dest('./public_html/js/'));
});
//copies jquery
gulp.task('copy-jsframeworks', function () {
    gulp.src([
        './development/js/scripts/*.js'
    ])
    .pipe(gulp.dest('./public_html/js/scripts/'));
});

//***** css *****
//autoprefix css and puts to production folder
gulp.task('autoprefixCSS', function () {
    gulp.src([
        './development/css/*.css'
    ])
    .pipe(prefix('last 100 versions'))
    .pipe(gulp.dest('./public_html/css/'));
});

//minimizes css
gulp.task('uglifyCSS', function () {
    gulp.src([
        './public_html/css/*.css'
    ])
    .pipe(cssMin())
    .pipe(gulp.dest('./public_html/css/'));
});

//***** COPY FILES *****
//copies html
gulp.task('copy-html', function () {
    gulp.src([
        './development/*.html'
    ])
    .pipe(gulp.dest('./public_html/'));
});

//***** DEFAULT - BUILD PROJECT *****

gulp.task('default', ['copy-html', 'images', 'autoprefixCSS', 'uglifyJS',  'copy-jsframeworks', 'uglifyCSS']);

