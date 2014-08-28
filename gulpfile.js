// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require("gulp-notify");
var minifyHTML = require('gulp-minify-html');
var insert = require('gulp-insert');
var htmlJsStr  = require('js-string-escape'); 
var tap = require('gulp-tap');
var es = require('event-stream');
var preprocess = require('gulp-preprocess');

// Set directory for sample application file-loading
var filesPath = 'sample_application/';
var StandaloneFiles = ['bower_components/angular/angular.js', 
					 'bower_components/angular-ui-router/release/angular-ui-router.js',
                     'bower_components/angular-touch/angular-touch.js',
					 'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
					 'release/SlimUI.js']; 
var StandaloneMinFiles = ['bower_components/angular/angular.min.js', 
					 'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                     'bower_components/angular-touch/angular-touch.min.js',
					 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
					 'release/SlimUI.min.js'];
// Lint Task
gulp.task('lint', function() {
    return gulp.src(['src/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Clean Task
gulp.task('clean', function(){
    return gulp.src('release/*.js', {read: false})
        .pipe(clean());
});

// Build the Framework
gulp.task('SlimUI', function() {
    return gulp.src('src/*.js')
        .pipe(preprocess( {context: {DEBUG: true}}))
        .pipe(concat('SlimUI.js'))
        .pipe(gulp.dest('release'));
});
gulp.task('SlimUImin', function() {
    return gulp.src('src/*.js')
        .pipe(preprocess( {context: {RELEASE: true}}))
        .pipe(concat('SlimUI.js'))
        .pipe(gulp.dest('release'))
        .pipe(rename('SlimUI.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('release'));
});

// Builds the Framework with all dependencies included. 
gulp.task('SlimUIStandalone', ['SlimUI'], function() {
    return gulp.src(StandaloneFiles)
        .pipe(concat('SlimUIStandalone.js'))
        .pipe(gulp.dest('release'));
});
gulp.task('SlimUIStandaloneMin', ['SlimUImin'], function() {
    return gulp.src(StandaloneMinFiles)
        .pipe(concat('SlimUIStandalone.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('release'));
});

// Build the Sample Application scripts
function buildScripts(){
	return gulp.src(filesPath + '**/*.js')
        .pipe(concat('compiledJS.js'))
        .pipe(gulp.dest(''));
}

// Build the Sample Application HTML into JS
function buildHTML(){
	var fileName =''; 
    return gulp.src(filesPath + '**/*.html')
		.pipe(minifyHTML({quotes: true, empty: true}))
		.pipe(tap(function(file) {
			var nameS = file.path.split("\\");
			var name = nameS[nameS.length -1];
			name= name.replace(".html", ""); 
			fileName = name + "Template"; 
		}))
		.pipe(insert.transform(function(contents) {
		  contents = htmlJsStr(contents); 
		  contents = "var "+ fileName+ " = '" + contents + "';";
		  return contents;
		}))
		.pipe(concat('compiledTemplates.html'))
        .pipe(gulp.dest(''));
}

// Build scripts and html separately
gulp.task('SampleApplicationParts', function() {
	return es.merge(
		buildScripts(),
		buildHTML()
	);
});

// Concatinate scripts and html into one file
function mergeAll(){
	return gulp.src(['compiledJS.js', 'compiledTemplates.html'])
		.pipe( concat('sample-application.js'))
		.pipe( gulp.dest(''));
}

// Build the Sample Application by merging together the built JS and HTML-as-JS files. 
// Require 'SampleApplicationParts' to be completed before this task runs
gulp.task('SampleApplication', ['SampleApplicationParts'], function(){
	return es.merge(
		mergeAll() 
	);

});

// Provide a default task that builds everything
gulp.task('default', ['lint', 'clean', 'SlimUI', 'SlimUImin', 'SlimUIStandalone', 'SlimUIStandaloneMin', 'SampleApplication']);