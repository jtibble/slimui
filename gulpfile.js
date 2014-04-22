// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var minify = false;




// Lint Task
gulp.task('lint', function() {
    return gulp.src(['src/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('SlimUI', function() {
    return gulp.src('src/*.js')
        .pipe(concat('SlimUI.js'))
        .pipe(gulp.dest('release'))
        .pipe(gulpif(minify,rename('SlimUI.min.js')))
        .pipe(gulpif(minify,uglify()))
        .pipe(gulp.dest('release'));
});



gulp.task('default', ['lint', 'SlimUI']);
