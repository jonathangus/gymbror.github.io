var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var iconify = require('gulp-iconify');
var livereload = require('gulp-livereload');

gulp.task('sass', function () {
    gulp.src('./src/scss/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
        .pipe(livereload());
});

gulp.task('browserify', function() {
    gulp.src('src/js/main.js')
      .pipe(plumber())
      .pipe(browserify({transform: 'reactify'}))
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('iconify', function() {
    iconify({
        src: 'src/assets/images/*.svg',
        pngOutput: 'src/assets/images/png',
        scssOutput: './src/scss/iconify',
        styleTemplate: '_icon_gen.scss.mustache'
    });
});


gulp.task('copy', function() {
    gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
    gulp.src('src/assets/**/*.*')
      .pipe(gulp.dest('dist/assets'));
});

gulp.task('default',['browserify', 'copy']);

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/js/**/*.*', ['default']);
    gulp.watch('src/scss/**/*.*', ['sass']);
    gulp.watch('src/assets/images/*.svg', ['iconify']);
});
