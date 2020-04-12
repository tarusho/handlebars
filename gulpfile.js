
var gulp = require("gulp");
var requireDir = require('require-dir');

requireDir('./gulptask',{recurse: true});

gulp.task('default',
  gulp.series(
    gulp.parallel(
      'assemble_pc',
      //'assemble_sp',
      //'copy',
      //'watch',
      'handletest',
      'assemble_test'
    )
  )
);
// gulp v4.0.0ではこう書く。のかな？

