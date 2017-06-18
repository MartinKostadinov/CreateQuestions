
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './app',
            online: true
        }
    });
      gulp.watch([
    'app/*.html',
    'app/*.js',
    'app/styles/*.css',
    '!./service-worker.js',
    '!./gulpfile.js'
  ], browserSync.reload);
  gulp.watch('app/styles/*.css',['prefix-watch']);

});
// autoprefixer
gulp.task('prefix', function () {
    gulp.src('./app/styles/*.css')
        // .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 5 versions', 'IE 10'],
            cascade: false
        }))
        .pipe(concat('main.css'))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/styles/'))
        .pipe(browserSync.stream());
});
gulp.task('prefix-watch', ['prefix'], function (done){
    browserSync.reload();
    done();
});
//imagemin
gulp.task('image', function () {
  return gulp.src('app/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('app/images'));
});

gulp.task('minify-css', function(){
    return gulp.src('app/styles/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/styles/min'));
});

gulp.task('default', ['prefix','serve', 'minify-css']);
// PROXY 
// gulp.task('browser-sync', function(){
//     browserSync.init({
//         proxy: 'localserver'
//     });
// });

// //useref
// gulp.task('useref', function () {
//   return gulp.src('./*.html')
//     .pipe(useref())
//     .pipe(gulpif('scripts/*.js', uglify()))
//     .pipe(gulpif('styles/css/*.css', minifyCss()))
//     .pipe(gulp.dest('dist'));
// });



