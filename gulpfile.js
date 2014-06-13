// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
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

// Set directory for sample application file-loading
var filesPath = 'sample_application/';

// Lint Task
gulp.task('lint', function() {
    return gulp.src(['src/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Build the Framework
gulp.task('SlimUI', function() {
    return gulp.src('src/*.js')
        .pipe(concat('SlimUI.js'))
        .pipe(gulp.dest('release'));
});
gulp.task('SlimUImin', function() {
    return gulp.src('src/*.js')
        .pipe(concat('SlimUI.js'))
        .pipe(gulp.dest('release'))
        .pipe(rename('SlimUI.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('release'));
});

// Builds the Framework with all dependencies included. 
gulp.task('SlimUIStandalone', ['SlimUI'], function() {
    return gulp.src(['bower_components/angular/angular.js', 
					 'bower_components/angular-ui-router/release/angular-ui-router.js', 
					 'bower_components/angular-sanitize/angular-sanitize.js',
					 'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
					 'bower_components/underscore/underscore.js', 
					 'release/SlimUI.js'])
        .pipe(concat('SlimUIStandalone.js'))
        .pipe(gulp.dest('release'));
});
gulp.task('SlimUIStandaloneMin', ['SlimUImin'], function() {
    return gulp.src(['bower_components/angular/angular.min.js', 
					 'bower_components/angular-ui-router/release/angular-ui-router.min.js', 
					 'bower_components/angular-sanitize/angular-sanitize.min.js',
					 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
					 'bower_components/underscore/underscore.js', 
					 'release/SlimUI.min.js'])
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

// Concatinate scripts and html into one file, 'app.js'
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
	).pipe(notify({message: 'Finished building Sample Application', onLast: true}));

});

// Provide a default task that builds everything
gulp.task('default', ['lint', 'SlimUI', 'SlimUImin', 'SlimUIStandalone', 'SlimUIStandaloneMin', 'SampleApplication']);