var gulp = require("gulp");
var uglify = require("gulp-uglifyjs");
var concat = require("gulp-concat");

var files = ["src/Gauge.js", "src/easing.js"];

gulp.task("uglify", function() {
  gulp.src(files)
    .pipe(uglify("Gauge.min.js"))
    .pipe(gulp.dest("build"));
});

gulp.task("concat", function() {
	gulp.src(files)
	  .pipe(concat("Gauge.js"))
	  .pipe( gulp.dest("build") );
});

gulp.task("watch", ["default"], function() {
	gulp.watch("src/*.js", ["default"]);
});

gulp.task("default", ["uglify", "concat"]);