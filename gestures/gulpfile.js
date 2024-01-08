const gulp = require('gulp');
const rename = require('gulp-rename');
const minifyJs = require('gulp-uglify');

exports.dist = (cp) => {
    gulp.src('./bundles/liyanjie.gestures.umd.js')
        .pipe(rename('liyanjie.gestures.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifyJs())
        .pipe(gulp.dest('./dist'));
    cp();
};
