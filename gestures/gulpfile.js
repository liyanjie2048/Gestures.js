const gulp = require('gulp');
const rename = require('gulp-rename');
const minifyJs = require('gulp-uglify');

exports.dist = (cp) => {
    gulp.src('./dist/liyanjie.gestures.js')
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifyJs())
        .pipe(gulp.dest('./dist'));
    cp();
};
