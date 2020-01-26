let gulp = require('gulp');
let sass = require('gulp-sass');

// compile sass
gulp.task('sass', function () {
    return gulp.src('public/stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/stylesheets/'));
});

// watch for sass updates
gulp.task('default', function() {
    gulp.watch('public/stylesheets/**/*.scss', gulp.series('sass'));
});