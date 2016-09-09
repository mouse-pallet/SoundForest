var gulp = require('gulp');

// default
gulp.task('default', [
  'server',
  'copy',
  'html',
  'css',
  'imgMin',
  'imgMinPng',
  'js',
  'watch'
]);

