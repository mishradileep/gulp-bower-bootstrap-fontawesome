
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass')
    notify = require("gulp-notify")
    bower = require('gulp-bower');

// Configs.
var config = {
  sassPath: './resources/sass',
  bowerDir: './bower_components',
  customFonts: './custom_fonts'
}

// Bower.
gulp.task('bower', function() {
  return bower().pipe(gulp.dest(config.bowerDir))
});

// FontAwesome.
gulp.task('icons', function() {
  return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
    .pipe(gulp.dest('./assets/fonts'));
});

// Custom fonts.
gulp.task('fonts', function() {
  return gulp.src(config.customFonts + '/**.*')
    .pipe(gulp.dest('./assets/fonts'));
});

// jQuery.
gulp.task('jquery', function() {
  return gulp.src(config.bowerDir + '/jquery/dist/*.min.js')
  .pipe(gulp.dest('./assets/vendor'));
});

// CSS.
gulp.task('css', function() {
  return gulp.src(config.sassPath + '/**/*.scss')
    .pipe(sass({
    style: 'compressed',
    loadPath: [
      './resources/sass',
      config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
      config.bowerDir + '/fontawesome/scss',
    ]
  })
  .on("error", notify.onError(function (error) {
    return "Error: " + error.message;
  })))
  .pipe(gulp.dest('./assets/css'));
 });

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(config.sassPath + '/**/*.scss', ['css']);
});

gulp.task('default', ['bower', 'icons', 'fonts', 'jquery', 'css']);
