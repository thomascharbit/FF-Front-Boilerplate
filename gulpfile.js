/*
Todo:
- compile modernizr base on tests
- conditional builld base on dev or prod arg
*/

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    compass = require('gulp-compass'),
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('modernizr', function () {
    gulp.src('./bower_components/modernizr/modernizr.js')
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

gulp.task('scripts', function () {
    gulp.src([
        './bower_components/jquery/dist/jquery.js',
        './src/js/*.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./js'));
});

gulp.task('styles', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'css',
            sass: 'src/scss',
            image: 'img'
        }))
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('./css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./css'));
});


gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['scripts'] );
    gulp.watch('src/scss/**/*.scss', ['styles'] );
});

gulp.task('default', ['scripts', 'styles']);
