var gulp = require("gulp");
var uglify = require("gulp-uglifyjs");


gulp.task('uglify', function() {
  gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('min'));
});