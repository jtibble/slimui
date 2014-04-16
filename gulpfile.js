// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var uncss = require('gulp-uncss');
var jsonminify = require('gulp-jsonminify');
var jeditor = require("gulp-json-editor");
var gulpif = require('gulp-if');
var insert = require('gulp-insert');
var tap = require('gulp-tap');
var minifyHTML = require('gulp-minify-html');
var htmlJsStr  = require('js-string-escape'); 

var scriptRoutes = [];
var minify = false;

//Reads json
var currentPath = './';
var destinationPath = './';
var config = require(currentPath + 'config.json'); 
var views = config.applicationConfig.views; 
var services = config.applicationConfig.services;
var components = config.applicationConfig.components;
var paths = [];
var htmlPaths = []; 

//Iterations to get GE files

for(var i in views){
	if(views[i].url){
		var rootPath = '';
		if(!views[i].rootPath){
			rootPath = config.applicationConfig.properties.rootPaths.default;
		}
		else{
			rootPath = config.applicationConfig.properties.rootPaths[views[i].rootPath];
		}
		if(rootPath == '' || rootPath == './'){
			rootPath = currentPath; 
		}
		while(rootPath.indexOf('../')!=-1){
			rootPath = rootPath.replace('../', '');
		}
		
		paths.push(rootPath + config.applicationConfig.properties.paths[views[i].path]+'**/*.js'); 
		//scriptRoutes.push(views[i].url);
	}
}

for(var i in services){
	var rootPath = '';
	if(!services[i].rootPath){
		rootPath = config.applicationConfig.properties.rootPaths.default;
	}
	else{
		rootPath = config.applicationConfig.properties.rootPaths[services[i].rootPath];
	}
	if(rootPath == '' || rootPath == './'){
		rootPath = currentPath; 
	}
	while(rootPath.indexOf('../')!=-1){
		rootPath = rootPath.replace('../', '');
	}
	
	paths.push(rootPath + config.applicationConfig.properties.paths[services[i].path]+'**/*.js'); 
	
}

for(var i in components){
	var rootPath = '';
	if(!components[i].rootPath){
		rootPath = config.applicationConfig.properties.rootPaths.default;
	}
	else{
		rootPath = config.applicationConfig.properties.rootPaths[components[i].rootPath];
	}
	if(rootPath == '' || rootPath == './'){
		rootPath = currentPath; 
	}
	while(rootPath.indexOf('../')!=-1){
		rootPath = rootPath.replace('../', '');
	}
	
	paths.push(rootPath + config.applicationConfig.properties.paths[components[i].path]+'**/*.js'); 
	
}


//Here starts the GULP Task 


// Lint Task
gulp.task('lint', function() {
    return gulp.src(['app/base/**/*.js', '!app/base/POC/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(paths)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('../webapp/app/ge'))
        .pipe(gulpif(minify,rename('app.min.js')))
        .pipe(gulpif(minify,uglify()))
        .pipe(gulp.dest('../webapp/app/ge'));
});

gulp.task('SlimUI', function() {
    return gulp.src('app/brands/ge/bower_components/slim-ui/src/*.js')
        .pipe(concat('SlimUI.js'))
        .pipe(gulp.dest('../webapp/app/ge'))
        .pipe(gulpif(minify,rename('SlimUI.min.js')))
        .pipe(gulpif(minify,uglify()))
        .pipe(gulp.dest('../webapp/app/ge'));
});

gulp.task('SlimUIStandalone', function() {
    return gulp.src(['app/brands/ge/bower_components/angular/angular.min.js', 
					 'app/brands/ge/bower_components/angular-ui-router/release/angular-ui-router.min.js', 
					 'app/brands/ge/bower_components/underscore/underscore.js', 
					 'shared/libs/angular/angular-resource.js', 
					 'shared/libs/angular/angular-sanitize.min.js',
					 'shared/libs/bootstrap/ui-bootstrap-tpls-0.8.0.js',
					 'app/brands/ge/bower_components/slim-ui/src/*.js'])
        .pipe(concat('SlimUIStandalone.js'))
        .pipe(gulp.dest('../webapp/app/ge'))
        .pipe(gulpif(minify,rename('SlimUIStandalone.min.js')))
        .pipe(gulpif(minify,uglify()))
        .pipe(gulp.dest('../webapp/app/ge'));
});

//Command to copy files
gulp.task('copy', function() {
    return gulp.src(['app/brands/ge/data', 'app/brands/ge/index.html'])
        .pipe(gulp.dest('../webapp/app/ge'))
});

//Minifies and copy css
gulp.task('css', function() {
    return gulp.src(['shared/libs/iids-2.0/iids/css/iids.min.css', 'shared/assets/css/override.css', 'shared/assets/css/override-ie.css'])
		//.pipe(uncss({
        //    html: ['app/brands/ge/index.html', 'app/base/**/*.html']
        //}))
		.pipe(gulpif(minify,minifyCSS()))
		.pipe(gulp.dest('../webapp/app/ge'))
});

//Adds compiledMode flag and minifies config.json
gulp.task('json', function() {
    return gulp.src('app/brands/ge/config.json')
		//.pipe(jeditor(function(json) {
			/*something =[];	
			var x =json.applicationConfig.views;
			for(var i in x){
				if(x[i].url)
					something.push(x[i].url);
			}*/
			//json.applicationConfig.compiledMode = true;
			//return json; // must return JSON object.
		  //}))
		.pipe(gulpif(minify, jsonminify()))
        .pipe(gulp.dest('../webapp/app/ge'));
});

//Watch for changes
gulp.task('watch', function() {
    gulp.watch('app/brands/*/config.json', ['json']);
});
gulp.task('htmlConcat', function() {
	var fileName =''; 
    return gulp.src(["app/base/**/*.html", '!app/base/POC/**', '!app/base/ToConvert/**', 'lsadmin/Administration/**/*.html'])
		.pipe(minifyHTML({quotes: true, empty: true}))
		.pipe(tap(function(file) {
			var nameS = file.path.split("\\");
			var name = nameS[nameS.length -1];
			name= name.replace(".html", ""); 
			
			fileName = name + "Template"; 
			
			//console.log(fileName);
		}))
		//.pipe(insert.wrap("var "+ this.fileName+" = '[", "]'"))
		.pipe(insert.transform(function(contents) {
		  
		  
		  //contents = contents.replace(/'/g, "\\'");
		  //contents = contents.replace(/"/g, "\\\"");
		  contents = htmlJsStr(contents); 
		  contents = "var "+ fileName+ " = '" + contents + "';";
		  return contents;
		}))
		.pipe(concat('app.html'))
        .pipe(gulp.dest('../webapp/app/ge'));
});


gulp.task('html', ['htmlConcat', 'scripts'], function() {
	 return gulp.src(['../webapp/app/ge/app.js', '../webapp/app/ge/app.html'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('../webapp/app/ge'))
        .pipe(gulpif(minify,rename('app.min.js')))
        .pipe(gulpif(minify,uglify()))
        .pipe(gulp.dest('../webapp/app/ge'));
});

gulp.task('default', ['lint', 'json', 'SlimUI', 'SlimUIStandalone', 'html', 'css', 'copy']);
