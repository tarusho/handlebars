var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var extname = require('gulp-extname');
var assemble = require('assemble');
var plumber = require('gulp-plumber');
var path    = require('path');
var fs = require("fs");
var app = assemble();
var obj = JSON.parse(fs.readFileSync("src/data/data.json", { encoding:"utf8" }));
gulp.task('load', function(cb) {
  app.partials('src/partials/*.hbs');
  app.layouts('src/layouts/pc.hbs');
  app.pages('src/doc/**/*.hbs');
  cb();
});

gulp.task('assemble_test', gulp.series( gulp.parallel('load'),function(){
  //明示的なreturnが必要
  return app.toStream('pages')
    .pipe(plumber())
    .pipe(app.renderFile({layout:'pc',obj:obj}))
    .pipe(htmlmin({collapseWhitespace: true}))
    //.pipe(rename())
    .pipe(extname('.html'))
    .pipe(app.dest('dist/'));
}));